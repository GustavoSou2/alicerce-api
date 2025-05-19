import { Injectable } from '@nestjs/common';
import { execution_history_documents } from '@prisma/client';
import { DocumentsService } from 'src/modules/documents/service/documents/documents.service';
import { execution_history_documents_body } from 'src/modules/execution_history_documents/controller/execution_history_documents.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExecutionHistoryDocumentsService {
  constructor(private prismaService: PrismaService, private documentsService: DocumentsService) {}

  async create(createExecutionHistoryDocumentDto: execution_history_documents_body) {
    const save_document_payload = {
      fileName: createExecutionHistoryDocumentDto.fileName,
      extension: createExecutionHistoryDocumentDto.fileExtension,
      size: createExecutionHistoryDocumentDto.size,
      base64: createExecutionHistoryDocumentDto.base64,
    };
    const saved_document = await this.documentsService.saveDocument(
      save_document_payload,
    );
    
    const execution_history_document_payload: Omit<execution_history_documents, 'id'> = {
      execution_history_id: createExecutionHistoryDocumentDto.execution_report_id,
      document_id: saved_document.id,
      is_validated: false,
      validated_at: null,
    }
    
    return this.prismaService.execution_history_documents.create({
      data: execution_history_document_payload,
    });
  }

  findAll() {
    return this.prismaService.execution_history_documents.findMany();
  }

  findOne(id: number) {
    return this.prismaService.execution_history_documents.findUnique({
      where: { id },
    });
  }

  update(
    id: number,
    updateExecutionHistoryDocumentDto: execution_history_documents,
  ) {
    return this.prismaService.execution_history_documents.update({
      where: { id },
      data: updateExecutionHistoryDocumentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.execution_history_documents.delete({
      where: { id },
    });
  }
}
