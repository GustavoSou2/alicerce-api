import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  Query,
} from "@nestjs/common";
import { action_plan, users } from "@prisma/client";
import { Request } from "express";
import { CreateActionPlanDto } from "src/modules/action-plan-status/services/action-plan-status.service";
import { ActionPlanService } from "src/modules/action_plan/services/action_plan.service";

@Controller("action-plan")
export class ActionPlanController {
  constructor(private readonly actionPlanService: ActionPlanService) {}

  @Post()
  create(@Body() data: CreateActionPlanDto, @Req() req: Request) {
    const { company_id } = req.user as users;
    return this.actionPlanService.create({
      ...data,
      company_id: company_id!,
    });
  }

  @Post(":action_plan_id/advance-status")
  advanceStatus(@Param("action_plan_id") action_plan_id: string, @Req() req: Request) {
    const { id: logged_user_id } = req.user as users;
    
    return this.actionPlanService.advanceStatus(
      +action_plan_id,
      logged_user_id,
    );
  }

  @Get()
  findAll(@Req() req: Request, @Query("action_plan_status") status_id: string) {
    const user = req.user as users;
    return this.actionPlanService.listActionPlanTargetsFlat(user, +status_id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.actionPlanService.findOne(+id);
  }

  @Patch(":id")
  patch(@Param("id") id: string, @Body() data: action_plan) {
    return this.actionPlanService.patch(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actionPlanService.remove(+id);
  }
}
