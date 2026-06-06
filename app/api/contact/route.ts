import { NextResponse } from "next/server";

import { parseContactPayload } from "@/lib/contact/schema";
import {
  ContactEmailConfigError,
  ContactEmailDeliveryError,
  sendContactEmails,
} from "@/lib/mail/contact-mailer";

export const runtime = "nodejs";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const DEFAULT_RATE_LIMIT_PER_HOUR = 3;
const rateLimitStore = new Map<string, RateLimitEntry>();

function getRateLimitPerHour(): number {
  const configuredLimit = Number.parseInt(
    process.env.EMAIL_RATE_LIMIT_PER_HOUR ?? "",
    10,
  );

  if (Number.isFinite(configuredLimit) && configuredLimit > 0) {
    return configuredLimit;
  }

  return DEFAULT_RATE_LIMIT_PER_HOUR;
}

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || "anonymous";
}

function checkRateLimit(request: Request):
  | {
      limited: false;
    }
  | {
      limited: true;
      retryAfterSeconds: number;
    } {
  const now = Date.now();
  const limit = getRateLimitPerHour();
  const clientKey = getClientKey(request);
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return { limited: false };
  }

  if (current.count >= limit) {
    return {
      limited: true,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  rateLimitStore.set(clientKey, current);

  return { limited: false };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Please submit the form again.",
      },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error,
        fieldErrors: parsed.fieldErrors,
      },
      { status: 400 },
    );
  }

  const rateLimit = checkRateLimit(request);

  if (rateLimit.limited) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many contact form submissions. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  try {
    await sendContactEmails(parsed.data);

    return NextResponse.json({
      ok: true,
      message:
        "Your message has been sent. Check your inbox for a confirmation copy.",
    });
  } catch (error) {
    if (error instanceof ContactEmailConfigError) {
      console.error("Contact form configuration error:", error.message);

      return NextResponse.json(
        {
          ok: false,
          error:
            "The contact form is temporarily unavailable. Please try again later.",
        },
        { status: 500 },
      );
    }

    if (error instanceof ContactEmailDeliveryError) {
      console.error("Contact form delivery error:", {
        message: error.message,
        status: error.status,
        responseBody: error.responseBody,
      });

      return NextResponse.json(
        {
          ok: false,
          error:
            "Your message could not be delivered right now. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    console.error("Unexpected contact form error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong while sending your message. Please try again.",
      },
      { status: 500 },
    );
  }
}
