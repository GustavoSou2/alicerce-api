import { BadRequestException, Injectable } from "@nestjs/common";
import { MailTrapService } from "src/modules/mail/providers/mail-trap/mail-trap.service";
import { SendGridService } from "src/modules/mail/providers/send-grid/send-grid.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MailService {
  private transporter;

  constructor(
    private mailtrapService: MailTrapService,
    private sendGridService: SendGridService,
    private prisma: PrismaService,
  ) {
    this.transporter =
      process.env.BASE == "production"
        ? this.sendGridService
        : this.mailtrapService;
  }

  async sendUserConfirmation(email: string, token: string, resource?: string) {
    try {
      if (process.env.BASE == "production") {
        await this.sendGridService.sendUserConfirmation({
          email,
          token,
          resource,
        });
      } else {
        await this.mailtrapService.sendUserConfirmation({
          email,
          token,
          resource,
        });
      }
    } catch (error: Error | unknown) {
      throw new BadRequestException({
        message: `Erro enviar email. Erro: ${error}`,
      });
    }
  }

  async sendLaunchEmail(payload: any) {
    try {
      const { email } = payload;

      const mail_already_subscribed: any =
        await this.prisma.pre_launch_subscriptions.findFirst({
          where: { email },
        });

      if (mail_already_subscribed) {
        throw new BadRequestException({
          message: "Email já cadastrado",
        });
      } else {
        await this.prisma.pre_launch_subscriptions.create({
          data: {
            ...payload,
            origin: "landing_page",
          },
        });
        if (process.env.BASE == "production") {
          await this.prisma.pre_launch_subscriptions.create({
            data: {
              ...payload,
              origin: "landing_page",
            },
          });
        }
      }

      if (process.env.BASE == "production") {
        await this.sendGridService.sendLaunchEmail(payload);
      } else {
        await this.mailtrapService.sendLaunchEmail(payload);
      }
    } catch (error: Error | unknown) {
      throw new BadRequestException({
        message: `Erro enviar email. Erro: ${error}`,
      });
    }
  }

  async sendContact(data: any) {
    try {
      if (process.env.BASE == "production") {
        await this.sendGridService.sendContact(data);
      } else {
        await this.mailtrapService.sendContact(data);
      }
    } catch (error: Error | unknown) {
      throw new BadRequestException({
        message: `Erro enviar email. Erro: ${error}`,
      });
    }
  }
}
