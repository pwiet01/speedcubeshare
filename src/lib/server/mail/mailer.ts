import nodemailer from 'nodemailer';
import fs from 'fs';
import { dev } from '$app/environment';
import { MAILER_HOST, MAILER_USER, MAILER_PASSWORD } from '$env/static/private';
import { serverConfig } from '$lib/server/config/serverConfig';
import { mailSubjects } from '$lib/server/mail/subjects/en/subjects';
import Handlebars from 'handlebars';
import logoPath from '$lib/assets/images/speedcubeshare_logo_full.png';
import '$lib/server/mail/templates/en/build/templates';

export interface CustomMail {
  to: string;
  template: string;
  props?: { [key: string]: any };
}

const transport = nodemailer.createTransport(
  {
    host: dev ? '0.0.0.0' : MAILER_HOST,
    port: dev ? 1025 : 465,
    secure: !dev,
    auth: {
      user: MAILER_USER,
      pass: MAILER_PASSWORD,
    },
  },
  {
    from: serverConfig.mail.sender,
  }
);

let logoBase64: string;

export async function sendMail(mail: CustomMail) {
  if (!logoBase64) {
    // FIXME Email base64 logo import broken in production
    logoBase64 = fs.readFileSync(logoPath.slice(1)).toString('base64');
  }

  return transport.sendMail({
    subject: mailSubjects[mail.template],
    to: mail.to,
    html: Handlebars.templates.base({
      logo: logoBase64,
      title: mailSubjects[mail.template],
      content: Handlebars.templates[mail.template](mail.props),
    }),
  });
}
