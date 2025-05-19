import { Module } from '@nestjs/common';
import { DocumentsController } from './controller/documents/documents.controller';
import { DocumentsService } from './service/documents/documents.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService]
})
export class DocumentsModule {}
