import { Module } from '@nestjs/common';
import { IaService } from 'src/modules/ia/services/ia.service';
import { ItemsController } from 'src/modules/items/controller/items.controller';
import { ItemsService } from 'src/modules/items/services/items.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService, IaService],
  exports: [ItemsService],
})
export class ItemsModule {}
