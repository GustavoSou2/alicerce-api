import { Module } from '@nestjs/common';
import { ExecutionReportsService } from './services/execution-reports.service';
import { ExecutionReportsController } from './controller/execution-reports.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExecutionReportsController],
  providers: [ExecutionReportsService, PrismaService],
})
export class ExecutionReportsModule {}
