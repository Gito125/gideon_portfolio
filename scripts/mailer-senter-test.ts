import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.MAILER_SENDER_TOKEN || "",
});

const sentFrom = new Sender("sender@example.com", "Gideon");

const recipients = [
    new Recipient("iamgideon125@gmail.com", "Gideon"),
];

const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("This is a Subject")
    .setHtml("Greetings from the team, you got this message through MailerSend.")
    .setText("Greetings from the team, you got this message through MailerSend.");

await mailerSend.email.send(emailParams);

