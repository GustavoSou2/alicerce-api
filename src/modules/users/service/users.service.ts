import { BadRequestException, Injectable } from "@nestjs/common";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { STATUS_CODES } from "http";
import { encryptData } from "src/helpers/functions/cripto.function";
import { UserRepository } from "src/modules/users/repositories/users.repository";
import { AuthService } from "src/modules/auth/service/auth.service";
import { MailService } from "src/modules/mail/service/mail.service";
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  create(user: users) {
    return this.userRepository.create(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findAllEmplooyes(company_id: number) {
    return this.prisma.users.findMany({
      where: { company_id },
      include: { role: true },
    });
  }

  async inviteEmplooyes(user: {
    email: string;
    role: string;
    company_id: number;
    inviter_id: number;
  }) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: user.email },
    });

    if (existingUser)
      throw new BadRequestException("Colaborador já cadastrado");

    const company = await this.prisma.companies.findUnique({
      where: { id: user.company_id },
    });

    if (!company) throw new BadRequestException("Empresa não encontrada");

    const role = await this.prisma.roles.findUnique({
      where: { id: Number(user.role) },
    });

    if (!role) throw new BadRequestException("Cargo nao encontrado");

    const inviter = await this.prisma.users.findUnique({
      where: { id: user.inviter_id },
    });

    if (!inviter)
      throw new BadRequestException("Usuário inviter nao encontrado");

    const token = await this.generateCollaboratorInviteToken({
      email: user.email,
      role: user.role,
      company_id: user.company_id,
    });

    console.log(token);

    if (!token) throw new BadRequestException("Erro ao gerar token");

    const urlData = {
      user_email: user.email,
      role_name: role.name,
      company_name: company.name,
      inviter_name: inviter.username,
    };

    const urlEncryptData = encryptData(urlData);
    const encryptedData = encodeURIComponent(urlEncryptData);

    const invite = await this.prisma.invites.create({
      data: {
        token,
        inviter_id: user.inviter_id,
        role: role.name,
        company_id: user.company_id,
        email: user.email,
      },
    });

    if (!invite) throw new BadRequestException("Erro ao criar convite");

    const url = `http://localhost:4200/collaborator/finalize?token=${token}&data=${encryptedData}`;

    await this.mailService.sendUserConfirmation(user.email, token, url);

    return { message: "E-mail de verificação enviado", token };
  }

  async completeInviteEmployee(data: {
    token: string;
    username: string;
    password: string;
  }) {
    try {
      const decoded = this.jwtService.verify(data.token, {
        secret: process.env.JWT_SECRET || "GuJa@17082024103280783*___._a1901",
      });

      if (!decoded) throw new BadRequestException("Token inválido ou expirado");

      const { email, role: role_id, company_id } = decoded;

      const hashedPassword = await bcrypt.hash(decoded.password, 10);

      const user = await this.prisma.users.create({
        data: {
          username: data.username,
          email: email,
          password: hashedPassword,
          company_id: Number(company_id),
          role_id: Number(role_id),
        },
      });

      return {
        message: "Colaborador cadastrado com sucesso",
        status: STATUS_CODES.sucesso,
        user,
      };
    } catch (error: Error | unknown) {
      console.log(error);
      throw new BadRequestException("Token inválido ou expirado");
    }
  }

  findById(id: number) {
    return this.userRepository.findById(id);
  }

  async generateCollaboratorInviteToken(collaborator: {
    email: string;
    role: string;
    company_id: number;
  }) {
    return this.jwtService.sign(collaborator, {
      secret: process.env.JWT_SECRET || "GuJa@17082024103280783*___._a1901",
      expiresIn: "7d",
    });
  }
}
