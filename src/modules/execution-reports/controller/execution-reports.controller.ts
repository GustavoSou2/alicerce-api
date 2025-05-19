import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { execution_reports } from '@prisma/client';
import { ExecutionReportsService } from 'src/modules/execution-reports/services/execution-reports.service';

@Controller('execution-reports')
export class ExecutionReportsController {
  constructor(private readonly executionReportsService: ExecutionReportsService) {}

  @Post()
  create(@Body() createExecutionReportDto: execution_reports) {
    return this.executionReportsService.create(createExecutionReportDto);
  }

  @Get()
  findAll() {
    return this.executionReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.executionReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExecutionReportDto: execution_reports) {
    return this.executionReportsService.update(+id, updateExecutionReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.executionReportsService.remove(+id);
  }
}
