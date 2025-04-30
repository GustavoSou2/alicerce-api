import { Injectable } from "@nestjs/common";
import { clients } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: clients) {
    return this.prisma.clients.create({ data });
  }

  async findAll(company_id: number) {
    return this.prisma.clients.findMany({
      where: { company_id },
    });
  }

  async findOne(id: number) {
    return this.prisma.clients.findUnique({ where: { id } });
  }

  async update(id: number, data: clients) {
    return this.prisma.clients.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.clients.delete({ where: { id } });
  }
}
