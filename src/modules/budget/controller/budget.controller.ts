import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { budgets } from "@prisma/client";
import { BudgetService } from "src/modules/budget/services/budget.service";

@Controller("budget")
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  create(@Body() data: budgets) {
    return this.budgetService.create(data);
  }

  @Get(":project_id")
  findOne(@Param("project_id") project_id: string) {
    return this.budgetService.findOne(+project_id);
  }

  @Patch(":id")
  patch(@Param("id") id: string, @Body() data: budgets) {
    return this.budgetService.patch(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.budgetService.remove(+id);
  }
}
