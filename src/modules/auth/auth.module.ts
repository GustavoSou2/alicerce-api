import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "src/modules/auth/controller/auth.controller";
import { JwtStrategy } from "src/modules/auth/jwt/jwt.strategy";
import { AuthService } from "src/modules/auth/service/auth.service";
import { MailService } from "src/modules/mail/mail.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "GuJa@17082024103280783*___._a1901",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
