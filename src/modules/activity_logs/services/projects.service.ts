import { Injectable } from "@nestjs/common";
import { projects, users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: projects) {
    return this.prisma.projects.create({ data });
  }

  async findAll(user: users) {
    const { company_id } = user;
    return this.prisma.projects.findMany({
      where: { company_id: company_id! },
      include: {
        companies: true,
        users: true,
        clients: true,
        project_status: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.projects.findUnique({
      where: { id },
      include: {
        companies: true,
        users: true,
        clients: true,
        project_status: true,
      },
    });
  }

  async update(id: number, data: projects) {
    return this.prisma.projects.update({ where: { id }, data });
  }

  async patch(id: number, data: projects) {
    return this.prisma.projects.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    return this.prisma.projects.delete({ where: { id } });
  }
}
