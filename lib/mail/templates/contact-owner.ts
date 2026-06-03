import type { ContactMailTemplateData, MailTemplate } from "./types";
import { escapeHtml, formatMultilineHtml } from "./utils";

export function buildContactOwnerTemplate(
  data: ContactMailTemplateData,
): MailTemplate {
  const subject = `New portfolio contact from ${data.senderName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6;">
      <h1 style="margin: 0 0 24px; font-size: 24px;">New contact form submission</h1>
      <p style="margin: 0 0 16px;">A new message was submitted through your portfolio contact form.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
        <tr>
          <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Name</td>
          <td style="padding: 8px 0;">${escapeHtml(data.senderName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Email</td>
          <td style="padding: 8px 0;">${escapeHtml(data.senderEmail)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Submitted</td>
          <td style="padding: 8px 0;">${escapeHtml(data.submittedAtLabel)} (UTC)</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">ISO timestamp</td>
          <td style="padding: 8px 0;">${escapeHtml(data.submittedAtIso)}</td>
        </tr>
      </table>
      <div style="padding: 20px; border: 1px solid #d8d1c5; background: #faf7f0;">
        <p style="margin: 0 0 12px; font-weight: 700;">Message</p>
        <p style="margin: 0;">${formatMultilineHtml(data.message)}</p>
      </div>
      <p style="margin: 24px 0 0; color: #5f5f5f; font-size: 14px;">
        Reply directly to this email to respond to ${escapeHtml(data.senderName)}.
      </p>
    </div>
  `.trim();

  const text = [
    "New contact form submission",
    "",
    `Name: ${data.senderName}`,
    `Email: ${data.senderEmail}`,
    `Submitted: ${data.submittedAtLabel} (UTC)`,
    `ISO timestamp: ${data.submittedAtIso}`,
    "",
    "Message:",
    data.message,
    "",
    `Reply directly to this email to respond to ${data.senderName}.`,
  ].join("\n");

  return {
    subject,
    html,
    text,
  };
}
