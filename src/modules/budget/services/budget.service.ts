import { Injectable } from "@nestjs/common";
import { budgets} from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  async create(data: budgets) {
    return this.prisma.budgets.create({ data });
  }

  async findAll(project_id: number) {
    return this.prisma.budgets.findMany({
      where: { project_id: project_id! },
    });
  }

  async findOne(id: number) {
    return this.prisma.budgets.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: budgets) {
    return this.prisma.budgets.update({ where: { id }, data });
  }

  async patch(id: number, data: budgets) {
    return this.prisma.budgets.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    return this.prisma.budgets.delete({ where: { id } });
  }
}
