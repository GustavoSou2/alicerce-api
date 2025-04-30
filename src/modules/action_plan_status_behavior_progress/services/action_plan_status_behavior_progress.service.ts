import { Injectable } from "@nestjs/common";
import { action_plan_status_behavior_progress } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ActionPlanStatusBehaviorProgressService {
  constructor(private readonly prismaService: PrismaService) {}
  create(
    createActionPlanStatusBehaviorProgressDto: action_plan_status_behavior_progress,
  ) {
    return this.prismaService.action_plan_status_behavior_progress.create({
      data: {
        ...createActionPlanStatusBehaviorProgressDto,
      },
    });
  }

  findAll() {
    return this.prismaService.action_plan_status_behavior_progress.findMany({
      include: {
        action_plan_status_behavior: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.action_plan_status_behavior_progress.findUnique({
      where: { id },
    });
  }

  update(
    id: number,
    updateActionPlanStatusBehaviorProgressDto: action_plan_status_behavior_progress,
  ) {
    return this.prismaService.action_plan_status_behavior_progress.update({
      where: { id },
      data: {
        ...updateActionPlanStatusBehaviorProgressDto,
      },
    });

  }

  remove(id: number) {
    return this.prismaService.action_plan_status_behavior_progress.delete({
      where: { id },
    });
  }
}
