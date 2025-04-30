import { Module } from "@nestjs/common";
import { ActionPlanController } from "src/modules/action_plan/controller/action_plan.controller";
import { ActionPlanService } from "src/modules/action_plan/services/action_plan.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [ActionPlanController],
  providers: [ActionPlanService, PrismaService],
  exports: [ActionPlanService],
})
export class ActionPlanModule {}
