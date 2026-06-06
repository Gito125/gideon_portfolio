import type { ContactMailTemplateData, MailTemplate } from "./types";
import { escapeHtml, formatMultilineHtml } from "./utils";

export function buildContactOwnerTemplate(
  data: ContactMailTemplateData,
): MailTemplate {
  const subject = `New portfolio contact from ${data.senderName}`;

  const html = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0; background: #f7f6f2;">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 640px; border-collapse: collapse; background: #ffffff; border: 1px solid #bcbcb4; color: #1a1a1a; font-family: Inter, Arial, sans-serif;">
            <tr>
              <td style="padding: 16px 24px; border-bottom: 1px solid #bcbcb4;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                  <tr>
                    <td style="font-size: 11px; line-height: 1; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #854f0b;">Gideon Portfolio</td>
                    <td align="right" style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; line-height: 1; color: #639922;">CONTACT</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px 24px 24px;">
                <div style="width: 72px; height: 3px; background: #ef9f27; margin: 0 0 24px;"></div>
                <h1 style="margin: 0; color: #1a1a1a; font-family: Georgia, 'Times New Roman', serif; font-size: 34px; line-height: 1.12; font-weight: 400;">New contact form submission</h1>
                <p style="margin: 16px 0 0; color: #666666; font-size: 16px; line-height: 1.65;">A new message was submitted through your portfolio contact form.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 24px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-top: 1px solid #bcbcb4;">
                  <tr>
                    <td style="width: 148px; padding: 14px 16px 14px 0; border-bottom: 1px solid #bcbcb4; color: #666666; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; vertical-align: top;">Name</td>
                    <td style="padding: 14px 0; border-bottom: 1px solid #bcbcb4; color: #1a1a1a; font-size: 15px; line-height: 1.5;">${escapeHtml(data.senderName)}</td>
                  </tr>
                  <tr>
                    <td style="width: 148px; padding: 14px 16px 14px 0; border-bottom: 1px solid #bcbcb4; color: #666666; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; vertical-align: top;">Email</td>
                    <td style="padding: 14px 0; border-bottom: 1px solid #bcbcb4; color: #3b6d11; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 13px; line-height: 1.5; word-break: break-word;">${escapeHtml(data.senderEmail)}</td>
                  </tr>
                  <tr>
                    <td style="width: 148px; padding: 14px 16px 14px 0; border-bottom: 1px solid #bcbcb4; color: #666666; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; vertical-align: top;">Submitted</td>
                    <td style="padding: 14px 0; border-bottom: 1px solid #bcbcb4; color: #1a1a1a; font-size: 15px; line-height: 1.5;">${escapeHtml(data.submittedAtLabel)} (UTC)</td>
                  </tr>
                  <tr>
                    <td style="width: 148px; padding: 14px 16px 14px 0; border-bottom: 1px solid #bcbcb4; color: #666666; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; vertical-align: top;">ISO timestamp</td>
                    <td style="padding: 14px 0; border-bottom: 1px solid #bcbcb4; color: #666666; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 12px; line-height: 1.5; word-break: break-word;">${escapeHtml(data.submittedAtIso)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 24px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background: #f7f6f2; border: 1px solid #bcbcb4;">
                  <tr>
                    <td style="padding: 16px 18px; border-bottom: 1px solid #bcbcb4; color: #854f0b; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Message</td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 18px; color: #1a1a1a; font-size: 16px; line-height: 1.7;">${formatMultilineHtml(data.message)}</td>
                  </tr>
                </table>
                <p style="margin: 20px 0 0; color: #666666; font-size: 13px; line-height: 1.6;">Reply directly to this email to respond to ${escapeHtml(data.senderName)}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
