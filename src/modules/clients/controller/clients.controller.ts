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
import { clients, users } from "@prisma/client";
import { Request } from "express";
import { ClientsService } from "src/modules/clients/services/clients.service";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() data: clients, @Req() request: Request) {
    const { company_id } = <users>request.user;
    return this.clientsService.create({ ...data, company_id });
  }

  @Get()
  findAll(@Req() request: Request) {
    const { company_id } = <users>request.user;

    return this.clientsService.findAll(company_id!);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: clients) {
    return this.clientsService.update(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientsService.remove(+id);
  }
}
