import { Injectable } from "@nestjs/common";
import { action_plan_status } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

export class CreateActionPlanDto {
  project_id: number;
  status_id: number;
  responsible_user_id: number;
  company_id: number;
  action_type: string;
  priority: "low" | "medium" | "high";
  name: string;
  description?: string;
  targets: CreateActionPlanTargetDto[];
}

export class CreateActionPlanTargetDto {
  target_id: number;
  target_type: "item" | "subitem";
}

@Injectable()
export class ActionPlanStatusService {
  constructor(private prisma: PrismaService) {}

  async create(action_status: action_plan_status) {
    const actionPlanStatus = await this.prisma.action_plan_status.create({
      data: action_status,
    });

    return actionPlanStatus;
  }

  async findAll(company_id: number) {
    return this.prisma.action_plan_status.findMany({
      where: { company_id },
      include: {
        action_plan: true,
        action_plan_status_behavior: {
          include: {
            action_plan_status_behavior_progress: true,
          },
        },
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.action_plan_status.findUnique({ where: { id } });
  }

  async update(id: number, data: action_plan_status) {
    return this.prisma.action_plan_status.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.action_plan_status.delete({ where: { id } });
  }
}
