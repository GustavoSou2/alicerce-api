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
import { projects, users } from "@prisma/client";
import { Request } from "express";
import { ProjectsService } from "src/modules/projects/services/projects.service";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() data: projects, @Req() req: Request) {
    const { company_id, id } = req.user as users;
    return this.projectsService.create({
      ...data,
      company_id: company_id!,
      created_by: id,
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as users;
    return this.projectsService.findAll(user);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(":id")
  patch(@Param("id") id: string, @Body() data: projects) {
    return this.projectsService.patch(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectsService.remove(+id);
  }
}
