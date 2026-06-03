import type { ContactFormData } from "@/lib/contact/schema";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

import { buildContactOwnerTemplate } from "./templates/contact-owner";
import { buildContactSenderTemplate } from "./templates/contact-sender";

const PORTFOLIO_SENDER_NAME = "Ogwang Gift Gideon";
const PORTFOLIO_SENDER_LABEL = "Gideon Portfolio";

type MailerSendConfig = {
  senderToken: string;
  senderEmail: string;
};

export class MailerSendConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailerSendConfigError";
  }
}

export class MailerSendDeliveryError extends Error {
  status?: number;
  responseBody?: unknown;

  constructor(message: string, status?: number, responseBody?: unknown) {
    super(message);
    this.name = "MailerSendDeliveryError";
    this.status = status;
    this.responseBody = responseBody;
  }
}

function getMailerSendConfig(): MailerSendConfig {
  const senderToken = process.env.MAILER_SENDER_TOKEN?.trim();
  const senderEmail = process.env.MAILER_SENDER_EMAIL?.trim();

  if (!senderToken) {
    throw new MailerSendConfigError(
      "Missing MAILER_SENDER_TOKEN environment variable.",
    );
  }

  if (!senderEmail) {
    throw new MailerSendConfigError(
      "Missing MAILER_SENDER_EMAIL environment variable.",
    );
  }

  return {
    senderToken,
    senderEmail,
  };
}

function createMailerSendClient(config: MailerSendConfig): MailerSend {
  return new MailerSend({
    apiKey: config.senderToken,
  });
}

async function sendEmail(
  mailerSend: MailerSend,
  emailParams: EmailParams,
): Promise<void> {
  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    const candidate = error as {
      statusCode?: number;
      body?: unknown;
      responseBody?: unknown;
      message?: string;
    };

    throw new MailerSendDeliveryError(
      candidate.message || "MailerSend rejected the email request.",
      candidate.statusCode,
      candidate.responseBody ?? candidate.body ?? error,
    );
  }
}

export async function sendContactEmails(
  submission: ContactFormData,
): Promise<void> {
  const config = getMailerSendConfig();
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
  const mailerSend = createMailerSendClient(config);
  const sentFrom = new Sender(config.senderEmail, PORTFOLIO_SENDER_LABEL);
  const ownerReplyTo = new Sender(submission.email, submission.name);
  const senderReplyTo = new Sender(config.senderEmail, PORTFOLIO_SENDER_NAME);
  const ownerRecipients = [
    new Recipient(config.senderEmail, PORTFOLIO_SENDER_NAME),
  ];
  const senderRecipients = [
    new Recipient(submission.email, submission.name),
  ];
  const ownerEmailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(ownerRecipients)
    .setReplyTo(ownerReplyTo)
    .setSubject(ownerTemplate.subject)
    .setHtml(ownerTemplate.html)
    .setText(ownerTemplate.text);
  const senderEmailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(senderRecipients)
    .setReplyTo(senderReplyTo)
    .setSubject(senderTemplate.subject)
    .setHtml(senderTemplate.html)
    .setText(senderTemplate.text);

  await sendEmail(mailerSend, ownerEmailParams);
  await sendEmail(mailerSend, senderEmailParams);
}
