import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
} from "@nestjs/common";
import {  project_status, users } from "@prisma/client";
import { Request } from "express";
import { StatusService } from "src/modules/status/services/status.service";

@Controller("status")
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  create(@Body() data: project_status, @Req() request: Request) {
    const { company_id } = <users>request.user;
    return this.statusService.create({ ...data, company_id: company_id! });
  }

  @Get()
  findAll(@Req() request: Request) {
    const { company_id } = <users>request.user;

    return this.statusService.findAll(company_id!);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.statusService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: project_status) {
    return this.statusService.update(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.statusService.remove(+id);
  }
}
