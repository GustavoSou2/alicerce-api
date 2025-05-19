import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { MailService } from "src/modules/mail/service/mail.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<users>> {
    const user = await this.prisma.users.findUnique({
      where: { email },
      include: {
        role: true,
        companies: true,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return user;
  }

  async login(user: Partial<users>) {
    const payload = { user: user };

    delete user.password;

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async createUser(userData: users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.prisma.users.create({
      data: {
        email: userData.email,
        username: userData.username,
        company_id: userData.company_id,
        password: hashedPassword,
        role_id: userData.role_id,
      },
    });

    return { message: "Usuário criado com sucesso!", user };
  }

  async generateRegistrationToken(userData: {
    username: string;
    email: string;
    password: string;
    companyName: string;
    document: string;
  }): Promise<string> {
    const payload = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      companyName: userData.companyName,
      document: userData.document,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || "GuJa@17082024103280783*___._a1901",
      expiresIn: "7d",
    });
  }
}
