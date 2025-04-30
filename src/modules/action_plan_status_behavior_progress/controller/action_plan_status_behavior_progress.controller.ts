import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ActionPlanStatusBehaviorProgressService } from "../services/action_plan_status_behavior_progress.service";
import { action_plan_status_behavior_progress } from "@prisma/client";

@Controller("action-plan-status-behavior-progress")
export class ActionPlanStatusBehaviorProgressController {
  constructor(
    private readonly actionPlanStatusBehaviorProgressService: ActionPlanStatusBehaviorProgressService,
  ) {}

  @Post()
  create(
    @Body()
    createActionPlanStatusBehaviorProgressDto: action_plan_status_behavior_progress,
  ) {
    return this.actionPlanStatusBehaviorProgressService.create(
      createActionPlanStatusBehaviorProgressDto,
    );
  }

  @Get()
  findAll() {
    return this.actionPlanStatusBehaviorProgressService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.actionPlanStatusBehaviorProgressService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body()
    updateActionPlanStatusBehaviorProgressDto: action_plan_status_behavior_progress,
  ) {
    return this.actionPlanStatusBehaviorProgressService.update(
      +id,
      updateActionPlanStatusBehaviorProgressDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actionPlanStatusBehaviorProgressService.remove(+id);
  }
}
