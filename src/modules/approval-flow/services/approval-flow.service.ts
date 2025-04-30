import { Injectable } from "@nestjs/common";
import { approval_flow, users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ApprovalFlowService {
  constructor(private prisma: PrismaService) {}

  async create(data: approval_flow) {
    return this.prisma.approval_flow.create({ data });
  }

  async findAll(user: users) {
    const { company_id } = user;
    return this.prisma.approval_flow.findMany({
      where: { company_id: company_id! },
      include: {
        companies: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.approval_flow.findUnique({
      where: { id },
      include: {
        companies: true,
      },
    });
  }

  async update(id: number, data: approval_flow) {
    return this.prisma.approval_flow.update({ where: { id }, data });
  }

  async patch(id: number, data: approval_flow) {
    
    return this.prisma.approval_flow.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    return this.prisma.approval_flow.delete({ where: { id } });
  }
}
