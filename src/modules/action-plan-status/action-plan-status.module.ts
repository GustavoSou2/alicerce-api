import { Module } from "@nestjs/common";
import { ActionPlanStatusController } from "src/modules/action-plan-status/controller/action-plan-status.controller";
import { ActionPlanStatusService } from "src/modules/action-plan-status/services/action-plan-status.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [ActionPlanStatusService, PrismaService],
  controllers: [ActionPlanStatusController],
})
export class ActionPlanStatusModule {}
