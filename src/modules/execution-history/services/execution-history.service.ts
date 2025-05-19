import { Injectable } from "@nestjs/common";
import { execution_history } from "@prisma/client";
import { execution_history_documents_body } from "src/modules/execution_history_documents/controller/execution_history_documents.controller";
import { ExecutionHistoryDocumentsService } from "src/modules/execution_history_documents/services/execution_history_documents.service";
import { PrismaService } from "src/prisma/prisma.service";

export interface execution_history_body extends execution_history {
  document: execution_history_documents_body;
}

@Injectable()
export class ExecutionHistoryService {
  constructor(
    private prismaService: PrismaService,
    private executionHistoryDocumentsService: ExecutionHistoryDocumentsService,
  ) {}
  async create(createExecutionHistoryDto: execution_history_body) {
    const {
      document: execution_history_document,
      ...execution_history_payload
    } = createExecutionHistoryDto;

    if (execution_history_document)
      await this.executionHistoryDocumentsService.create(
        execution_history_document,
      );

    return this.prismaService.execution_history.create({
      data: execution_history_payload,
    });
  }

  findAll() {
    return this.prismaService.execution_history.findMany();
  }

  findOne(id: number) {
    return this.prismaService.execution_history.findUnique({ where: { id } });
  }

  update(id: number, updateExecutionHistoryDto: execution_history) {
    return this.prismaService.execution_history.update({
      where: { id },
      data: updateExecutionHistoryDto,
    });
  }

  remove(id: number) {
    return this.prismaService.execution_history.delete({ where: { id } });
  }
}
