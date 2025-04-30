import { Module } from "@nestjs/common";
import { UsersService } from "./service/users.service";
import { UsersController } from "./controller/users.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/modules/users/repositories/users.repository";
import { AuthService } from "src/modules/auth/service/auth.service";
import { MailService } from "src/modules/mail/mail.service";

@Module({
  providers: [
    UsersService,
    PrismaService,
    UserRepository,
    AuthService,
    JwtService,
    MailService,
  ],
  controllers: [UsersController],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
