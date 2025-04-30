import { Injectable } from "@nestjs/common";
import { roles } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(data: roles) {
    return this.prisma.roles.create({ data });
  }

  async findAll(company_id: number) {
    return this.prisma.roles.findMany({
      where: { company_id },
    });
  }

  async findOne(id: number) {
    return this.prisma.roles.findUnique({ where: { id } });
  }

  async update(id: number, data: roles) {
    return this.prisma.roles.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.roles.delete({ where: { id } });
  }
}
