import { Module } from '@nestjs/common';
import { BudgetController } from 'src/modules/budget/controller/budget.controller';
import { BudgetService } from 'src/modules/budget/services/budget.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService, PrismaService],
  exports: [BudgetService],
})
export class BudgetModule {}
