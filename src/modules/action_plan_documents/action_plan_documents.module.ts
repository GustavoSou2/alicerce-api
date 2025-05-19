import { Module } from "@nestjs/common";
import { ActionPlanDocumentsService } from "./services/action_plan_documents.service";
import { ActionPlanDocumentsController } from "src/modules/action_plan_documents/controller/action_plan_documents.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [ActionPlanDocumentsController],
  providers: [ActionPlanDocumentsService, PrismaService],
})
export class ActionPlanDocumentsModule {}
