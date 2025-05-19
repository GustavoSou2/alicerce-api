import { Module } from '@nestjs/common';
import { DocumentsService } from 'src/modules/documents/service/documents/documents.service';
import { ExecutionHistoryController } from 'src/modules/execution-history/controller/execution-history.controller';
import { ExecutionHistoryService } from 'src/modules/execution-history/services/execution-history.service';
import { ExecutionHistoryDocumentsService } from 'src/modules/execution_history_documents/services/execution_history_documents.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExecutionHistoryController],
  providers: [
    ExecutionHistoryService,
    PrismaService,
    ExecutionHistoryDocumentsService,
    DocumentsService,
  ],
})
export class ExecutionHistoryModule {}
