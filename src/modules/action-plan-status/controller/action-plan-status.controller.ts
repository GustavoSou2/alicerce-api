import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { action_plan_status, users } from "@prisma/client";
import { Request } from "express";
import { ActionPlanStatusService } from "src/modules/action-plan-status/services/action-plan-status.service";

@Controller("action-plan-status")
export class ActionPlanStatusController {
  constructor(
    private readonly actionPlanStatusService: ActionPlanStatusService,
  ) {}

  @Post()
  create(@Body() data: action_plan_status, @Req() request: Request) {
    const { company_id } = <users>request.user;
    return this.actionPlanStatusService.create({
      ...data,
      company_id: company_id!,
    });
  }

  @Get()
  findAll(@Req() request: Request) {
    const { company_id } = <users>request.user;

    return this.actionPlanStatusService.findAll(company_id!);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.actionPlanStatusService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: action_plan_status) {
    return this.actionPlanStatusService.update(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actionPlanStatusService.remove(+id);
  }
}
