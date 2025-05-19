import { Module } from "@nestjs/common";
import { ActionPlanStatusService } from "src/modules/action-plan-status/services/action-plan-status.service";
import { ActionPlanController } from "src/modules/action_plan/controller/action_plan.controller";
import { ActionPlanService } from "src/modules/action_plan/services/action_plan.service";
import { ApprovalFlowService } from "src/modules/approval-flow/services/approval-flow.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [ActionPlanController],
  providers: [
    ActionPlanService,
    PrismaService,
    ActionPlanStatusService,
    ApprovalFlowService
  ],
  exports: [ActionPlanService],
})
export class ActionPlanModule {}
