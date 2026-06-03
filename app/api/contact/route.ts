import { NextResponse } from "next/server";

import { parseContactPayload } from "@/lib/contact/schema";
import {
  MailerSendConfigError,
  MailerSendDeliveryError,
  sendContactEmails,
} from "@/lib/mail/contact-mailer";

export const runtime = "nodejs";

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

  try {
    await sendContactEmails(parsed.data);

    return NextResponse.json({
      ok: true,
      message:
        "Your message has been sent. Check your inbox for a confirmation copy.",
    });
  } catch (error) {
    if (error instanceof MailerSendConfigError) {
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

    if (error instanceof MailerSendDeliveryError) {
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
