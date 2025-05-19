import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { approval_flow, users } from "@prisma/client";
import { ActionPlanService } from "src/modules/action_plan/services/action_plan.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ApprovalFlowService {
  constructor(
    @Inject(forwardRef(() => ActionPlanService))
    private readonly actionPlanService: ActionPlanService,
    private prisma: PrismaService,
  ) {}

  async create(data: approval_flow) {
    return this.prisma.approval_flow.create({ data });
  }

  async findAll(user: users) {
    const { company_id } = user;
    const flows = await this.prisma.approval_flow.findMany({
      where: { company_id: company_id! },
      include: {
        companies: true,
        users: true,
        users_approval_flow_responsible_idTousers: true,
        users_approval_flow_rejected_byTousers: true,
      },
    });

    const flowsWithStatus = await Promise.all(
      flows.map(async (flow) => {
        if (flow.entity_type == "action_plan") {
          const current_status =
            await this.prisma.action_plan_status.findUnique({
              where: { id: flow.current_status_id },
            });

          const next_status = await this.prisma.action_plan_status.findUnique({
            where: { id: flow.next_status_id },
          });

          const {
            users_approval_flow_responsible_idTousers,
            users_approval_flow_rejected_byTousers,
            ..._flow
          } = flow;

          return {
            ..._flow,
            current_status,
            next_status,
            responsible_user: users_approval_flow_responsible_idTousers,
            rejected_by_user: users_approval_flow_rejected_byTousers,
            approval_status: this.resolveApprovalStatus(flow),
            logged_user_is_approver: flow.users.id == user.id,
          };
        } else {
          const {
            users_approval_flow_responsible_idTousers,
            users_approval_flow_rejected_byTousers,
            ..._flow
          } = flow;

          return {
            ..._flow,
            responsible_user: users_approval_flow_responsible_idTousers,
            rejected_by_user: users_approval_flow_rejected_byTousers,
            approval_status: this.resolveApprovalStatus(flow),
            logged_user_is_approver: flow.users.id == user.id,
          };
        }
      }),
    );

    return flowsWithStatus;
  }

  async approveFlow(id: number, item: any) {
    const approvalFlow = await this.findOne(id);

    if (approvalFlow?.entity_type == "action_plan") {
      const actionPlanTarget = await this.prisma.action_plan_target.findFirst({
        where: {
          id: approvalFlow.entity_id,
        },
        include: {
          action_plan: true,
        },
      });

      const actionPlan = await this.actionPlanService.update(
        <any>actionPlanTarget?.action_plan?.id,
        <any>{
          status_id: approvalFlow.next_status_id,
        },
      );

      if (actionPlan?.status_id == approvalFlow.next_status_id) {
        return this.prisma.approval_flow.update({
          where: { id: id },
          data: item,
        });
      }
    } else {
      return this.prisma.approval_flow.update({
        where: { id: id },
        data: item,
      });
    }
  }

  resolveApprovalStatus(item: any): any {
    const now = new Date();

    const isApproved = !!item.approved_by && !!item.approved_date;
    const isRejected = !!item.rejected_by || !!item.rejection_reason;
    const isLate =
      !isApproved &&
      !isRejected &&
      item.deadline &&
      new Date(item.deadline).getTime() < now.getTime();

    if (isApproved)
      return {
        name: "Aprovado",
        name_code: "approved",
        color: "#A8E6CF",
      };
    if (isRejected)
      return {
        name: "Rejeitado",
        name_code: "rejected",
        color: "#FF8B94",
      };
    if (isLate)
      return {
        name: "Atrasado",
        name_code: "late",
        color: "#FFD3B6",
      };

    return {
      name: "Pendente",
      name_code: "pending",
      color: "#D3E0EA",
    };
  }

  async findOne(id: number) {
    return this.prisma.approval_flow.findUnique({
      where: { id },
      include: {
        companies: true,
      },
    });
  }

  async update(id: number, data: approval_flow) {
    return this.prisma.approval_flow.update({ where: { id }, data });
  }

  async patch(id: number, data: approval_flow) {
    return this.prisma.approval_flow.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    return this.prisma.approval_flow.delete({ where: { id } });
  }
}
