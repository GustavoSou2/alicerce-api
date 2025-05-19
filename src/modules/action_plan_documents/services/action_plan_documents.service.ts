import { Injectable } from '@nestjs/common';
import { action_plan_document } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActionPlanDocumentsService {
  constructor(private prisma: PrismaService) { }
  
  create(createActionPlanDocumentDto: action_plan_document) {
    return this.prisma.action_plan_document.create({ data: createActionPlanDocumentDto });
  }

  findAll() {
    return this.prisma.action_plan_document.findMany();
  }

  findOne(id: number) {
    return this.prisma.action_plan_document.findUnique({ where: { id } });
  }

  update(id: number, updateActionPlanDocumentDto: action_plan_document) {
    return this.prisma.action_plan_document.update({ where: { id }, data: updateActionPlanDocumentDto });
  }

  remove(id: number) {
    return this.prisma.action_plan_document.delete({ where: { id } });
  }
}
