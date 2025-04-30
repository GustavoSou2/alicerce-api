import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import { Request } from "express";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { STATUS_CODES } from "http";
import { UsersService } from "src/modules/users/service/users.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() body: users) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get("emplooyes")
  findAllEmplooyes(@Req() req: Request) {
    const { company_id } = req.user as users;
    return this.usersService.findAllEmplooyes(company_id!);
  }

  @Post("emplooyes/invite")
  inviteEmplooyes(
    @Req() req: Request,
    @Body() body: { email: string; role: string },
  ) {
    const { company_id, id } = req.user as users;

    return this.usersService.inviteEmplooyes({
      ...body,
      company_id: company_id!,
      inviter_id: id,
    });
  }

  @Post("emplooyes/invite/complete")
  async completeInviteEmployee(
    @Body() body: { token: string; username: string; password: string },
  ) {
    try {
      const decoded = this.jwtService.verify(body.token, {
        secret: process.env.JWT_SECRET || "GuJa@17082024103280783*___._a1901",
      });

      if (!decoded) throw new BadRequestException("Token inválido ou expirado");

      const inviter = await this.prisma.invites.findFirstOrThrow({
        where: { email: decoded.email, company_id: decoded.company_id },
      });

      if (!inviter) throw new BadRequestException("Nenhum convite encontrado");

      const { email, role: role_id, company_id } = decoded;

      const hashedPassword = await bcrypt.hash(body.password, 10);

      const user = await this.prisma.users.create({
        data: {
          username: body.username,
          email: email,
          password: hashedPassword,
          company_id: Number(company_id),
          role_id: Number(role_id),
        },
      });

      await this.prisma.invites.delete({
        where: { id: inviter.id },
      });

      return {
        message: "Colaborador cadastrado com sucesso",
        status: STATUS_CODES.sucesso,
        user,
      };
    } catch (error: Error | unknown) {
      throw new BadRequestException("Erro: " + error);
    }
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.usersService.findById(Number(id));
  }
}
