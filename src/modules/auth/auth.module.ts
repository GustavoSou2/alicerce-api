import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "src/modules/auth/controller/auth.controller";
import { JwtStrategy } from "src/modules/auth/jwt/jwt.strategy";
import { AuthService } from "src/modules/auth/service/auth.service";
import { MailModule } from "src/modules/mail/mail.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "GuJa@17082024103280783*___._a1901",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
