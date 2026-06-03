import type { ContactMailTemplateData, MailTemplate } from "./types";
import { escapeHtml, formatMultilineHtml } from "./utils";

export function buildContactSenderTemplate(
  data: ContactMailTemplateData,
): MailTemplate {
  const subject = `Your message to ${data.senderIdentityName} was received`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6;">
      <h1 style="margin: 0 0 24px; font-size: 24px;">Thanks for reaching out</h1>
      <p style="margin: 0 0 16px;">
        Hi ${escapeHtml(data.senderName)}, your message has been received. ${escapeHtml(data.senderIdentityName)}
        will review it and reply with a clear next step.
      </p>
      <p style="margin: 0 0 16px;">
        This confirmation was sent from ${escapeHtml(data.senderIdentityEmail)} on ${escapeHtml(data.submittedAtLabel)} (UTC).
      </p>
      <div style="padding: 20px; border: 1px solid #d8d1c5; background: #faf7f0;">
        <p style="margin: 0 0 12px; font-weight: 700;">Your message</p>
        <p style="margin: 0;">${formatMultilineHtml(data.message)}</p>
      </div>
      <p style="margin: 24px 0 0; color: #5f5f5f; font-size: 14px;">
        If you need to add context, reply to this email.
      </p>
    </div>
  `.trim();

  const text = [
    "Thanks for reaching out.",
    "",
    `Hi ${data.senderName}, your message has been received. ${data.senderIdentityName} will review it and reply with a clear next step.`,
    `This confirmation was sent from ${data.senderIdentityEmail} on ${data.submittedAtLabel} (UTC).`,
    "",
    "Your message:",
    data.message,
    "",
    "If you need to add context, reply to this email.",
  ].join("\n");

  return {
    subject,
    html,
    text,
  };
}
