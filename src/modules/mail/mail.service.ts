import { BadRequestException, Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendUserConfirmation(email: string, token: string, resource?: string) {
    try {
      const confirmUrl = resource ??=`http://localhost:4200/register/confirm?token=${token}`;

      await this.transporter.sendMail({
        from: '"Alicerce" <no-reply@alicerce.com>',
        to: email,
        subject: "Finalize seu cadastro",
        text: `Olá, clique no link para finalizar seu cadastro: ${confirmUrl}`,
        html: `<p>Olá,</p><p>Clique no link para finalizar seu cadastro:</p><a href="${confirmUrl}">${confirmUrl}</a>`,
      });
    } catch (error: Error | unknown) {
      throw new BadRequestException(
        `Erro enviar email. Erro: ${error}`,
      );
    }
  }
}
