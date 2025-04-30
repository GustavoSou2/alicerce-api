import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ActionPlanStatusBehaviorService } from "../services/action_plan_status_behavior.service";
import { action_plan_status_behavior } from "@prisma/client";

@Controller("action-plan-status-behavior")
export class ActionPlanStatusBehaviorController {
  constructor(
    private readonly actionPlanStatusBehaviorService: ActionPlanStatusBehaviorService,
  ) {}

  @Post()
  create(
    @Body()
    action_plan_status_behavior: action_plan_status_behavior,
  ) {
    return this.actionPlanStatusBehaviorService.create(
      action_plan_status_behavior,
    );
  }

  @Get()
  findAll() {
    return this.actionPlanStatusBehaviorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.actionPlanStatusBehaviorService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body()
    updateActionPlanStatusBehaviorDto: action_plan_status_behavior,
  ) {
    return this.actionPlanStatusBehaviorService.update(
      +id,
      updateActionPlanStatusBehaviorDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actionPlanStatusBehaviorService.remove(+id);
  }
}
