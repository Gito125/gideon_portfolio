import type { ContactMailTemplateData, MailTemplate } from "./types";
import { escapeHtml, formatMultilineHtml } from "./utils";

export function buildContactSenderTemplate(
  data: ContactMailTemplateData,
): MailTemplate {
  const subject = `Your message to ${data.senderIdentityName} was received`;

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
                    <td align="right" style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; line-height: 1; color: #639922;">RECEIVED</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px 24px 24px;">
                <div style="width: 72px; height: 3px; background: #ef9f27; margin: 0 0 24px;"></div>
                <h1 style="margin: 0; color: #1a1a1a; font-family: Georgia, 'Times New Roman', serif; font-size: 34px; line-height: 1.12; font-weight: 400;">Thanks for reaching out</h1>
                <p style="margin: 16px 0 0; color: #666666; font-size: 16px; line-height: 1.65;">
                  Hi ${escapeHtml(data.senderName)}, your message has been received. ${escapeHtml(data.senderIdentityName)} will review it and reply with a clear next step.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 24px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background: #eaf3de; border: 1px solid #639922;">
                  <tr>
                    <td style="padding: 16px 18px; color: #3b6d11; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Confirmation</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 18px 18px; color: #1a1a1a; font-size: 15px; line-height: 1.6;">
                      Sent from <span style="font-family: 'JetBrains Mono', Consolas, monospace; color: #3b6d11; font-size: 13px; word-break: break-word;">${escapeHtml(data.senderIdentityEmail)}</span> on ${escapeHtml(data.submittedAtLabel)} (UTC).
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 24px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background: #f7f6f2; border: 1px solid #bcbcb4;">
                  <tr>
                    <td style="padding: 16px 18px; border-bottom: 1px solid #bcbcb4; color: #854f0b; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Your message</td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 18px; color: #1a1a1a; font-size: 16px; line-height: 1.7;">${formatMultilineHtml(data.message)}</td>
                  </tr>
                </table>
                <p style="margin: 20px 0 0; color: #666666; font-size: 13px; line-height: 1.6;">If you need to add context, reply to this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
