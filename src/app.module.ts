import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtModule } from "@nestjs/jwt";
import { StatusModule } from "src/modules/status/status.module";
import { UsersModule } from "src/modules/users/users.module";
import { ProjectsModule } from "src/modules/projects/projects.module";
import { ClientsModule } from "src/modules/clients/clients.module";
import { RolesModule } from "src/modules/roles/roles.module";
import { AuthModule } from "src/modules/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";
import { ApprovalFlowModule } from "src/modules/approval-flow/approval-flow.module";
import { ItemsModule } from "src/modules/items/items.module";
import { BudgetModule } from "src/modules/budget/budget.module";
import { IaModule } from "./modules/ia/ia.module";
import { SubItemModule } from "./modules/sub_item/sub_item.module";
import { ActionPlanStatusModule } from "./modules/action-plan-status/action-plan-status.module";
import { ActionPlanModule } from "src/modules/action_plan/action_plan.module";
import { ActionPlanStatusBehaviorModule } from "./modules/action_plan_status_behavior/action_plan_status_behavior.module";
import { ActionPlanStatusBehaviorProgressModule } from "./modules/action_plan_status_behavior_progress/action_plan_status_behavior_progress.module";
import { DocumentsModule } from "./modules/documents/documents.module";
import { ActionPlanDocumentsModule } from "./modules/action_plan_documents/action_plan_documents.module";
import { ExecutionReportsModule } from "./modules/execution-reports/execution-reports.module";
import { ExecutionHistoryModule } from "./modules/execution-history/execution-history.module";
import { ExecutionHistoryDocumentsModule } from "./modules/execution_history_documents/execution_history_documents.module";
import { MailModule } from "./modules/mail/mail.module";

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    ClientsModule,
    RolesModule,
    AuthModule,
    StatusModule,
    ApprovalFlowModule,
    ItemsModule,
    BudgetModule,
    IaModule,
    SubItemModule,
    ActionPlanStatusModule,
    ActionPlanModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "GuJa@17082024103280783*___._a1901",
      signOptions: { expiresIn: "7d" },
    }),
    ActionPlanStatusBehaviorModule,
    ActionPlanStatusBehaviorProgressModule,
    DocumentsModule,
    ActionPlanDocumentsModule,
    ExecutionReportsModule,
    ExecutionHistoryModule,
    ExecutionHistoryDocumentsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
