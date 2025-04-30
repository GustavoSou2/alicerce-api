import { Injectable } from "@nestjs/common";
import { action_plan_status_behavior } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ActionPlanStatusBehaviorService {
  constructor(private prismaService: PrismaService) {}
  create(createActionPlanStatusBehaviorDto: action_plan_status_behavior) {
    return this.prismaService.action_plan_status_behavior.create({
      data: {
        ...createActionPlanStatusBehaviorDto,
        config: createActionPlanStatusBehaviorDto.config ?? undefined,
      },
    });
  }

  findAll() {
    return this.prismaService.action_plan_status_behavior.findMany({
      include: {
        action_plan_status: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.action_plan_status_behavior.findUnique({
      where: { id },
    });
  }

  update(
    id: number,
    updateActionPlanStatusBehaviorDto: action_plan_status_behavior,
  ) {
    return this.prismaService.action_plan_status_behavior.update({
      where: { id },
      data: {
        ...updateActionPlanStatusBehaviorDto,
        config: updateActionPlanStatusBehaviorDto.config ?? undefined,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.action_plan_status_behavior.delete({
      where: { id },
    });
  }
}
