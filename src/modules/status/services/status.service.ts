import { Injectable } from "@nestjs/common";
import { project_status } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async create(data: project_status) {
    const status = await this.prisma.project_status.findMany({
      where: {
        company_id: data.company_id,
      },
    });

    data.rank = (status.length ??= 0) + 1;
    
    return this.prisma.project_status.create({ data });
  }

  async findAll(company_id: number) {
    return this.prisma.project_status.findMany({
      where: { company_id },
    });
  }

  async findOne(id: number) {
    return this.prisma.project_status.findUnique({ where: { id } });
  }

  async update(id: number, data: project_status) {
    return this.prisma.project_status.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.project_status.delete({ where: { id } });
  }
}
