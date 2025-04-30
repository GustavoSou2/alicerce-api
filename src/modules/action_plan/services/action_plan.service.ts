import { Injectable } from "@nestjs/common";
import { action_plan, users } from "@prisma/client";
import { CreateActionPlanDto } from "src/modules/action-plan-status/services/action-plan-status.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ActionPlanService {
  constructor(private prisma: PrismaService) {}

  async create(createActionPlanDto: CreateActionPlanDto) {
    const {
      company_id,
      project_id,
      responsible_user_id,
      action_type,
      priority,
      name,
      description,
      targets,
    } = createActionPlanDto;

    const firstActionPlanStatus =
      await this.prisma.action_plan_status.findFirst({
        where: { company_id },
      });

    const actionPlan = await this.prisma.action_plan.create({
      data: {
        project_id,
        company_id,
        status_id: firstActionPlanStatus?.id,
        responsible_user_id,
        action_type,
        priority,
        name,
        description,
      },
    });

    const item = await this.prisma.items.findFirst({
      where: { project_id },
    });

    if (item) {
      const existingActionPlan = await this.prisma.action_plan.findFirst({
        where: { project_id, company_id },
      });

      if (!existingActionPlan) {
        await this.prisma.items.update({
          where: { id: item.id },
          data: { status: "in_progress" },
        });
      }
    }

    const targetsData = targets.map((target) => ({
      action_plan_id: actionPlan.id,
      target_id: target.target_id,
      target_type: target.target_type,
    }));

    await this.prisma.action_plan_target.createMany({
      data: targetsData,
    });

    await this.prisma.subitems.updateMany({
      where: { item_id: item?.id },
      data: { status: "in_progress" },
    });

    return actionPlan;
  }

  async findAll(user: users) {
    const { company_id } = user;
    return this.prisma.action_plan.findMany({
      where: { company_id: company_id! },
    });
  }

  async listActionPlanTargetsFlat(user: users, status_id: number) {
    const { company_id } = user;

    const targets = await this.getActionPlanTargets(company_id!, status_id);

    const result = await Promise.all(
      targets.map(async (t) => this.processTarget(t)),
    );
    const filteredResult = result.filter((r) => r !== null);

    const metrics = await this.getActionPlanMetrics(filteredResult);

    return {
      metrics,
      data: filteredResult,
    };
  }

  async getActionPlanTargets(company_id: number, status_id: number) {
    return this.prisma.action_plan_target.findMany({
      where: {
        action_plan: {
          company_id: company_id,
          ...(status_id && { status_id }),
        },
      },
      include: {
        action_plan: {
          include: {
            action_plan_status: true,
            action_plan_status_behavior_progress: true,
            approval_flows: true,
            users: true,
          },
        },
      },
    });
  }

  async processTarget(t: any) {
    if (t.target_type === "item") {
      return this.processItem(t);
    }

    if (t.target_type === "subitem") {
      return this.processSubitem(t);
    }

    return null;
  }

  async processItem(t: any) {
    const item = await this.prisma.items.findUnique({
      where: { id: t.target_id },
    });

    if (!item || !t.action_plan) return null;

    return {
      ...t.action_plan,
      target_id: item.id,
      target_type: "item",
      target_detail: item,
      category: item.category,
      status: item.status,
      start_date: item.start_date,
      end_date: item.end_date,
      actual_cost: item.actual_cost,
      estimated_cost: item.budget,
      responsible_user_id: item.responsible_user_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  }

  // Função para processar um subitem
  async processSubitem(t: any) {
    const subitem = await this.prisma.subitems.findUnique({
      where: { id: t.target_id },
    });

    if (!subitem || !t.action_plan) return null;

    return {
      ...t.action_plan,
      target_id: subitem.id,
      target_type: "subitem",
      target_detail: subitem,
      category: subitem.category,
      start_date: subitem.start_date,
      end_date: subitem.end_date,
      actual_cost: subitem.actual_cost,
      estimated_cost: subitem.estimated_cost,
      responsible_user_id: subitem.responsible_user_id,
    };
  }

  // Função para obter as métricas do plano de ação
  async getActionPlanMetrics(data: any[]) {
    let totalEstimated = 0;
    let totalActual = 0;

    const categoryCount = new Map<string, number>();
    const priorityCount = new Map<string, number>();
    const userCount = new Map<string, number>();
    const actionTypeCount = new Map<string, number>();

    for (const item of data) {
      const estimated = Number(item.estimated_cost || 0);
      const actual = Number(item.actual_cost || 0);

      totalEstimated += estimated;
      totalActual += actual;

      if (item.category) {
        categoryCount.set(
          item.category,
          (categoryCount.get(item.category) || 0) + 1,
        );
      }

      if (item.priority) {
        priorityCount.set(
          item.priority,
          (priorityCount.get(item.priority) || 0) + 1,
        );
      }

      if (item.users?.username) {
        userCount.set(
          item.users.username,
          (userCount.get(item.users.username) || 0) + 1,
        );
      }

      if (item.action_type) {
        actionTypeCount.set(
          item.action_type,
          (actionTypeCount.get(item.action_type) || 0) + 1,
        );
      }
    }

    return {
      totalTargets: data.length,
      totalEstimated,
      totalActual,
      totalDifference: totalEstimated - totalActual,
      groupedByCategory: Object.fromEntries(categoryCount),
      groupedByPriority: Object.fromEntries(priorityCount),
      groupedByUser: Object.fromEntries(userCount),
      groupedByActionType: Object.fromEntries(actionTypeCount),
    };
  }

  // Função para agrupar as métricas por categoria
  groupByCategory(metrics: any) {
    return metrics._groupBy.reduce((acc: any, metric: any) => {
      if (!acc[metric.category]) acc[metric.category] = 0;
      acc[metric.category] += metric._sum.estimated_cost || 0;
      return acc;
    }, {});
  }

  // Função para agrupar as métricas por prioridade
  groupByPriority(metrics: any) {
    return metrics._groupBy.reduce((acc: any, metric: any) => {
      if (!acc[metric.priority]) acc[metric.priority] = 0;
      acc[metric.priority] += metric._sum.estimated_cost || 0;
      return acc;
    }, {});
  }

  async findOne(id: number) {
    return this.prisma.action_plan.findUnique({
      where: { id },
      include: {
        companies: true,
      },
    });
  }

  async update(id: number, data: action_plan) {
    return this.prisma.action_plan.update({ where: { id }, data });
  }

  async patch(id: number, data: action_plan) {
    return this.prisma.action_plan.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    return this.prisma.action_plan.delete({ where: { id } });
  }
}
