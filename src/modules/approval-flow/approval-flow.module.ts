import { forwardRef, Module } from "@nestjs/common";
import { ActionPlanModule } from "src/modules/action_plan/action_plan.module";
import { ApprovalFlowController } from "src/modules/approval-flow/controller/approval-flow.controller";
import { ApprovalFlowService } from "src/modules/approval-flow/services/approval-flow.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [forwardRef(() => ActionPlanModule)],
  controllers: [ApprovalFlowController],
  providers: [ApprovalFlowService, PrismaService],
  exports: [ApprovalFlowService],
})
export class ApprovalFlowModule {}
