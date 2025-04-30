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
import { roles, users } from "@prisma/client";
import { Request } from "express";
import { RolesService } from "src/modules/roles/services/roles.service";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() data: roles, @Req() req: Request) {
    const { company_id } = req.user as users;
    return this.rolesService.create({ ...data, company_id });
  }

  @Get()
  findAll(@Req() req: Request) {
    const { company_id } = req.user as users;
    return this.rolesService.findAll(company_id!);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: roles) {
    return this.rolesService.update(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
