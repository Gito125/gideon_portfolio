import type { ContactFormData } from "@/lib/contact/schema";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

import { buildContactOwnerTemplate } from "./templates/contact-owner";
import { buildContactSenderTemplate } from "./templates/contact-sender";

const PORTFOLIO_SENDER_NAME = "Ogwang Gift Gideon";
const PORTFOLIO_SENDER_LABEL = "Gideon Portfolio";

type EmailProvider = "mailersend" | "resend" | "brevo" | "none";

type ContactEmailConfig = {
  provider: EmailProvider;
  token: string;
  senderEmail: string;
  recipientEmail: string;
};

type ContactEmailMessage = {
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
  replyToName: string;
  replyToEmail: string;
  subject: string;
  html: string;
  text: string;
};

export class ContactEmailConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactEmailConfigError";
  }
}

export class ContactEmailDeliveryError extends Error {
  status?: number;
  responseBody?: unknown;

  constructor(message: string, status?: number, responseBody?: unknown) {
    super(message);
    this.name = "ContactEmailDeliveryError";
    this.status = status;
    this.responseBody = responseBody;
  }
}

function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER?.trim().toLowerCase();

  if (!provider) {
    return "resend";
  }

  if (
    provider === "mailersend" ||
    provider === "resend" ||
    provider === "brevo" ||
    provider === "none"
  ) {
    return provider;
  }

  throw new ContactEmailConfigError(
    "EMAIL_PROVIDER must be one of: mailersend, resend, brevo, none.",
  );
}

function getProviderToken(provider: EmailProvider): string {
  if (provider === "none") {
    return "";
  }

  if (provider === "resend") {
    return (
      process.env.RESEND_TOKEN?.trim() ||
      process.env.RESEND_API_KEY?.trim() ||
      ""
    );
  }

  if (provider === "mailersend") {
    return process.env.MAILER_SENDER_TOKEN?.trim() || "";
  }

  return process.env.BREVO_API_KEY?.trim() || "";
}

function getContactEmailConfig(): ContactEmailConfig {
  const provider = getEmailProvider();
  const token = getProviderToken(provider);
  const senderEmail =
    process.env.SENDER_EMAIL?.trim() ||
    process.env.MAILER_SENDER_EMAIL?.trim() ||
    "";
  const recipientEmail =
    process.env.CONTACT_FORM_RECIPIENT_EMAIL?.trim() || senderEmail;

  if (provider !== "none" && !token) {
    throw new ContactEmailConfigError(
      `Missing API token for EMAIL_PROVIDER=${provider}.`,
    );
  }

  if (!senderEmail) {
    throw new ContactEmailConfigError("Missing SENDER_EMAIL environment variable.");
  }

  if (!recipientEmail) {
    throw new ContactEmailConfigError(
      "Missing CONTACT_FORM_RECIPIENT_EMAIL environment variable.",
    );
  }

  return {
    provider,
    token,
    senderEmail,
    recipientEmail,
  };
}

function createMailerSendClient(config: ContactEmailConfig): MailerSend {
  return new MailerSend({
    apiKey: config.token,
  });
}

async function sendMailerSendEmail(
  mailerSend: MailerSend,
  message: ContactEmailMessage,
): Promise<void> {
  const emailParams = new EmailParams()
    .setFrom(new Sender(message.fromEmail, message.fromName))
    .setTo([new Recipient(message.toEmail, message.toName)])
    .setReplyTo(new Sender(message.replyToEmail, message.replyToName))
    .setSubject(message.subject)
    .setHtml(message.html)
    .setText(message.text);

  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    const candidate = error as {
      statusCode?: number;
      body?: unknown;
      responseBody?: unknown;
      message?: string;
    };

    throw new ContactEmailDeliveryError(
      candidate.message || "MailerSend rejected the email request.",
      candidate.statusCode,
      candidate.responseBody ?? candidate.body ?? error,
    );
  }
}

async function parseJsonResponse(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function sendResendEmail(
  config: ContactEmailConfig,
  message: ContactEmailMessage,
): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${message.fromName} <${message.fromEmail}>`,
      to: [message.toEmail],
      reply_to: `${message.replyToName} <${message.replyToEmail}>`,
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });

  if (!response.ok) {
    throw new ContactEmailDeliveryError(
      "Resend rejected the email request.",
      response.status,
      await parseJsonResponse(response),
    );
  }
}

async function sendBrevoEmail(
  config: ContactEmailConfig,
  message: ContactEmailMessage,
): Promise<void> {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "api-key": config.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        email: message.fromEmail,
        name: message.fromName,
      },
      to: [
        {
          email: message.toEmail,
          name: message.toName,
        },
      ],
      replyTo: {
        email: message.replyToEmail,
        name: message.replyToName,
      },
      subject: message.subject,
      htmlContent: message.html,
      textContent: message.text,
    }),
  });

  if (!response.ok) {
    throw new ContactEmailDeliveryError(
      "Brevo rejected the email request.",
      response.status,
      await parseJsonResponse(response),
    );
  }
}

async function sendProviderEmail(
  config: ContactEmailConfig,
  message: ContactEmailMessage,
): Promise<void> {
  if (config.provider === "none") {
    return;
  }

  if (config.provider === "resend") {
    await sendResendEmail(config, message);
    return;
  }

  if (config.provider === "brevo") {
    await sendBrevoEmail(config, message);
    return;
  }

  await sendMailerSendEmail(createMailerSendClient(config), message);
}

export async function sendContactEmails(
  submission: ContactFormData,
): Promise<void> {
  const config = getContactEmailConfig();
  const submittedAt = new Date();
  const submittedAtIso = submittedAt.toISOString();
  const submittedAtLabel = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(submittedAt);

  const templateData = {
    senderName: submission.name,
    senderEmail: submission.email,
    message: submission.message,
    submittedAtIso,
    submittedAtLabel,
    senderIdentityName: PORTFOLIO_SENDER_NAME,
    senderIdentityEmail: config.senderEmail,
  };

  const ownerTemplate = buildContactOwnerTemplate(templateData);
  const senderTemplate = buildContactSenderTemplate(templateData);

  await sendProviderEmail(config, {
    fromName: PORTFOLIO_SENDER_LABEL,
    fromEmail: config.senderEmail,
    toName: PORTFOLIO_SENDER_NAME,
    toEmail: config.recipientEmail,
    replyToName: submission.name,
    replyToEmail: submission.email,
    subject: ownerTemplate.subject,
    html: ownerTemplate.html,
    text: ownerTemplate.text,
  });

  await sendProviderEmail(config, {
    fromName: PORTFOLIO_SENDER_LABEL,
    fromEmail: config.senderEmail,
    toName: submission.name,
    toEmail: submission.email,
    replyToName: PORTFOLIO_SENDER_NAME,
    replyToEmail: config.senderEmail,
    subject: senderTemplate.subject,
    html: senderTemplate.html,
    text: senderTemplate.text,
  });
}
