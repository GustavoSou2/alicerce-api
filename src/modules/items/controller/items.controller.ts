import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { items } from "@prisma/client";
import { ItemsService } from "src/modules/items/services/items.service";

@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() data: items) {
    return this.itemsService.create(data);
  }

  @Get("project/:project_id")
  findAll(@Param("project_id") project_id: string) {
    return this.itemsService.findAll(+project_id);
  }

  @Get("find/:id")
  findOne(@Param("id") id: string) {
    return this.itemsService.findOne(+id);
  }

  @Get("categories")
  findCategories() {
    return this.itemsService.categories();
  }

  @Patch(":id")
  patch(@Param("id") id: string, @Body() data: items) {
    return this.itemsService.patch(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.itemsService.remove(+id);
  }
}
