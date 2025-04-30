import { Module } from "@nestjs/common";
import { ActionPlanStatusBehaviorService } from "./services/action_plan_status_behavior.service";
import { ActionPlanStatusBehaviorController } from "./controller/action_plan_status_behavior.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [ActionPlanStatusBehaviorController],
  providers: [ActionPlanStatusBehaviorService, PrismaService],
})
export class ActionPlanStatusBehaviorModule {}
