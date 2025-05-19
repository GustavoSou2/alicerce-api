import { BadRequestException, Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { pre_launch_template } from "src/modules/mail/templates/pre-launch.template";

@Injectable()
export class MailTrapService {
  private nodemailer;
  constructor() {
    this.nodemailer = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendUserConfirmation(config: any) {
    try {
      const { email, token, resource } = config;

      const confirmUrl =
        resource ?? `http://localhost:4200/register/confirm?token=${token}`;

      await this.nodemailer.sendMail({
        from: '"Alicerce" <no-reply@alicerce.com>',
        to: email,
        subject: "Finalize seu cadastro",
        text: `Olá, clique no link para finalizar seu cadastro: ${confirmUrl}`,
        html: `<p>Olá,</p><p>Clique no link para finalizar seu cadastro:</p><a href="${confirmUrl}">${confirmUrl}</a>`,
      });
    } catch (error: Error | unknown) {
      throw new BadRequestException(`Erro enviar email. Erro: ${error}`);
    }
  }

  async sendLaunchEmail(payload: any) {
    try {
      const { email } = payload;

      const pre_launch_template_html = pre_launch_template;

      await this.nodemailer.sendMail({
        from: '"Alicerce" <no-reply@alicerce.com>',
        to: email,
        subject: "Lista de pré-lançamento",
        text: "Cadastrado na lista de pré-lançamento",
        html: pre_launch_template_html,
      });
    } catch (error: Error | unknown) {
      throw new BadRequestException(`Erro enviar email. Erro: ${error}`);
    }
  }

  async sendContact(data: any) {
    try {
      await this.nodemailer.sendMail({
        from: '"Alicerce" <no-reply@alicerce.com>',
        to: data.email,
        subject: "Contato",
        text: `Olá, ${data.name}, ${data.message}`,
        html: `<p>Olá, ${data.name}</p><p>${data.message}</p>`,
      });
    } catch (error: Error | unknown) {
      throw new BadRequestException(`Erro enviar email. Erro: ${error}`);
    }
  }
}
