import { Module } from "@nestjs/common";
import { ActionPlanStatusBehaviorProgressService } from "./services/action_plan_status_behavior_progress.service";
import { ActionPlanStatusBehaviorProgressController } from "./controller/action_plan_status_behavior_progress.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [ActionPlanStatusBehaviorProgressController],
  providers: [ActionPlanStatusBehaviorProgressService, PrismaService],
})
export class ActionPlanStatusBehaviorProgressModule {}
