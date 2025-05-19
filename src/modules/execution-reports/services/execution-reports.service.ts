import { Injectable } from "@nestjs/common";
import { execution_reports } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ExecutionReportsService {
  constructor(private prismaService: PrismaService) {}

  create(createExecutionReportDto: execution_reports) {
    return this.prismaService.execution_reports.create({
      data: createExecutionReportDto,
    });
  }

  findAll() {
    return this.prismaService.execution_reports.findMany();
  }

  findOne(id: number) {
    return this.prismaService.execution_reports.findUnique({ where: { id } });
  }

  update(id: number, updateExecutionReportDto: execution_reports) {
    return this.prismaService.execution_reports.update({
      where: { id },
      data: updateExecutionReportDto,
    });
  }

  remove(id: number) {
    return this.prismaService.execution_reports.delete({ where: { id } });
  }
}
