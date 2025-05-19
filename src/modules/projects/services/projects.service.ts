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
        items: true,
        project_status: true,
      },
    });
  }

  async update(id: number, data: projects) {
    return this.prisma.projects.update({ where: { id }, data });
  }

  async nextStatus(project_id: number) {
    const project = await this.prisma.projects.findUnique({
      where: { id: project_id },
      include: { project_status: true },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const currentStatus = project.project_status;
    const nextStatus = await this.prisma.project_status.findFirst({
      where: { id: currentStatus.id + 1 },
    });

    if (!nextStatus) {
      throw new Error("No next status found");
    }

    return this.prisma.projects.update({
      where: { id: project_id },
      data: { status: nextStatus.id },
    });
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
