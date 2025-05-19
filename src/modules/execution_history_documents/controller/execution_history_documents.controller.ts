import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ExecutionHistoryDocumentsService } from "../services/execution_history_documents.service";
import { execution_history_documents } from "@prisma/client";

export interface execution_history_documents_body {
  execution_report_id: number;
  fileName: string;
  fileExtension: string;
  size: number;
  base64: string;
}

@Controller("execution-history-documents")
export class ExecutionHistoryDocumentsController {
  constructor(
    private readonly executionHistoryDocumentsService: ExecutionHistoryDocumentsService
  ) {}

  @Post()
  create(
    @Body()
    createExecutionHistoryDocumentDto: execution_history_documents_body,
  ) {
    return this.executionHistoryDocumentsService.create(
      createExecutionHistoryDocumentDto,
    );
  }

  @Get()
  findAll() {
    return this.executionHistoryDocumentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.executionHistoryDocumentsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body()
    updateExecutionHistoryDocumentDto: execution_history_documents,
  ) {
    return this.executionHistoryDocumentsService.update(
      +id,
      updateExecutionHistoryDocumentDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.executionHistoryDocumentsService.remove(+id);
  }
}
