import { Module } from "@nestjs/common";
import { MailController } from "src/modules/mail/controller/mail.controller";
import { MailService } from "src/modules/mail/service/mail.service";
import { MailTrapService } from "./providers/mail-trap/mail-trap.service";
import { SendGridService } from "./providers/send-grid/send-grid.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [MailService, MailTrapService, SendGridService, PrismaService],
  controllers: [MailController],
  exports: [MailService, MailTrapService, SendGridService],
})
export class MailModule {}
