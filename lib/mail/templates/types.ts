export type MailTemplate = {
  subject: string;
  html: string;
  text: string;
};

export type ContactMailTemplateData = {
  senderName: string;
  senderEmail: string;
  message: string;
  submittedAtIso: string;
  submittedAtLabel: string;
  senderIdentityName: string;
  senderIdentityEmail: string;
};
