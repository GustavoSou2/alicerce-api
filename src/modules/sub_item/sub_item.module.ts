import { Module } from "@nestjs/common";
import { SubItemController } from "./controller/sub_item.controller";
import { SubItemService } from "src/modules/sub_item/services/sub_item.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [SubItemController],
  providers: [SubItemService, PrismaService],
})
export class SubItemModule {}
