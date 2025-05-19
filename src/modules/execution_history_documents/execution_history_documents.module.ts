import { Module } from "@nestjs/common";
import { ExecutionHistoryDocumentsService } from "./services/execution_history_documents.service";
import { ExecutionHistoryDocumentsController } from "./controller/execution_history_documents.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { DocumentsService } from "src/modules/documents/service/documents/documents.service";

@Module({
  controllers: [ExecutionHistoryDocumentsController],
  providers: [ExecutionHistoryDocumentsService, PrismaService, DocumentsService],
})
export class ExecutionHistoryDocumentsModule {}
