import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { subitems } from '@prisma/client';
import { SubItemService } from 'src/modules/sub_item/services/sub_item.service';

@Controller("sub-item")
export class SubItemController {
  constructor(private readonly subItemService: SubItemService) {}

  @Post()
  create(@Body() createSubItemDto: subitems) {
    return this.subItemService.create(createSubItemDto);
  }

  @Get("item/:item_id")
  findAllByItem(@Param("item_id") item_id: string) {
    return this.subItemService.findAll(+item_id);
  }

  @Get("find/:id")
  findOne(@Param("id") id: string) {
    return this.subItemService.findOne(+id);
  }
 
  @Get("units")
  findunits() {
    return this.subItemService.units();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSubItemDto: subitems) {
    return this.subItemService.update(+id, updateSubItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subItemService.remove(+id);
  }
}
