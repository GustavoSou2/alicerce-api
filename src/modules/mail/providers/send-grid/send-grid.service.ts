import { Injectable } from "@nestjs/common";
import * as sendGridMail from "@sendgrid/mail";
import { contact_admin_template, contact_client_template } from "src/modules/mail/templates/contact.template";
import {
  pre_launch_admin_template,
  pre_launch_template,
} from "src/modules/mail/templates/pre-launch.template";
import { user_confirmation_template } from "src/modules/mail/templates/user-confirmation.template";

@Injectable()
export class SendGridService {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;
    sendGridMail.setApiKey(apiKey!);
  }

  async sendUserConfirmation(payload: any): Promise<void> {
    const { email, token, resource } = payload;

    const confirmation_link =
      resource ?? `http://localhost:4200/register/confirm?token=${token}`;
    
    const user_confirmation_template_html = user_confirmation_template({
      confirmation_link,
    });

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: "Finalize seu cadastro",
      text: `Clique no link para finalizar seu cadastro`,
      html: user_confirmation_template_html,
    };

    await sendGridMail.send(msg);
  }

  async sendLaunchEmail(payload: any): Promise<void> {
    const { email } = payload;

    const pre_launch_template_html = pre_launch_template;
    const pre_launch_admin_template_html = pre_launch_admin_template(payload);

    const msg_client = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: "Lista de pré-lançamento",
      text: "Cadastrado na lista de pré-lançamento",
      html: pre_launch_template_html,
    };

    const msg_admin = {
      to: process.env.SENDGRID_FROM_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: "Lista de pré-lançamento",
      text: "Novo cadastro na lista de pré-lançamento",
      html: pre_launch_admin_template_html,
    };

    await sendGridMail.sendMultiple(msg_client);
    await sendGridMail.sendMultiple(msg_admin);
  }

  async sendContact(payload: any): Promise<void> {
    const { email } = payload;

    const contact_template_html = contact_client_template;
    const contact_admin_template_html = contact_admin_template(payload);

    const msg_client = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: "Contato <Alicerce>",
      text: `Olá, ${payload.name}`,
      html: contact_template_html,
    };

    const msg_admin = {
      to: process.env.SENDGRID_FROM_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: "Lista de pré-lançamento",
      text: "Novo cadastro na lista de pré-lançamento",
      html: contact_admin_template_html,
    };

    await sendGridMail.sendMultiple(msg_client);
    await sendGridMail.sendMultiple(msg_admin);
  }
}
