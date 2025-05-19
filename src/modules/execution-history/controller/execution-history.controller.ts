import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { execution_history } from '@prisma/client';
import { execution_history_body, ExecutionHistoryService } from 'src/modules/execution-history/services/execution-history.service';

@Controller("execution-history")
export class ExecutionHistoryController {
  constructor(
    private readonly executionHistoryService: ExecutionHistoryService,
  ) {}

  @Post()
  create(@Body() createExecutionHistoryDto: execution_history_body) {
    return this.executionHistoryService.create(createExecutionHistoryDto);
  }

  @Get()
  findAll() {
    return this.executionHistoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.executionHistoryService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateExecutionHistoryDto: execution_history,
  ) {
    return this.executionHistoryService.update(+id, updateExecutionHistoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.executionHistoryService.remove(+id);
  }
}
