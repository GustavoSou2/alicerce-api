import { Injectable } from "@nestjs/common";
import { items } from "@prisma/client";
import { IaService } from "src/modules/ia/services/ia.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ItemsService {
  constructor(
    private prisma: PrismaService,
    private iaService: IaService,
  ) {}

  async create(data: items) {
    return this.prisma.items.create({ data });
  }

  async findAll(project_id: number) {
    const items = await this.prisma.items.findMany({
      where: { project_id: project_id },
      include: {
        users: true,
        subitems: true, 
      },
    });

    const actionPlanTargets = await this.prisma.action_plan_target.findMany({
      where: {
        action_plan: {
          project_id: project_id,
        },
        target_type: "subitem",
      },
    });

    return items.map((item) => {
      const subitems = item.subitems.flatMap((subitem) => {
        const relatedSubitemTargets = actionPlanTargets.filter(
          (target) => target.target_id === subitem.id,
        );

        const subitemHasTargets =
          !!relatedSubitemTargets && relatedSubitemTargets.length > 0;

        return subitemHasTargets
          ? [{ ...subitem, action_plan_targets: relatedSubitemTargets }]
          : [subitem];
      });

      return {
        ...item,
        subitems,
      };
    });
  }

  async findOne(id: number) {
    return this.prisma.items.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });
  }

  async update(id: number, data: items) {
    return this.prisma.items.update({ where: { id }, data });
  }

  async patch(id: number, data: items) {
    return this.prisma.items.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    return this.prisma.items.delete({ where: { id } });
  }

  async categories() {
    return [
      { id: 1, category: "materials", label: "Materiais" },
      { id: 2, category: "labor", label: "Mão de obra" },
      { id: 3, category: "equipment", label: "Equipamentos" },
      { id: 4, category: "other", label: "Outros" },
    ];
  }
}
