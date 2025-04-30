import { Module } from '@nestjs/common';
import { ApprovalFlowController } from 'src/modules/approval-flow/controller/approval-flow.controller';
import { ApprovalFlowService } from 'src/modules/approval-flow/services/approval-flow.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ApprovalFlowController],
  providers: [ApprovalFlowService, PrismaService],
  exports: [ApprovalFlowService],
})
export class ApprovalFlowModule {}
