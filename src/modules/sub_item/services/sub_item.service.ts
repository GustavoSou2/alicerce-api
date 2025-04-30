import { Injectable } from "@nestjs/common";
import { subitems } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SubItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: subitems) {
    return this.prisma.subitems.create({ data });
  }

  async findAll(item_id: number) {
    return this.prisma.subitems.findMany({
      where: { item_id: item_id! },
      include: {
        users: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.subitems.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });
  }

  async update(id: number, data: subitems) {
    return this.prisma.subitems.update({ where: { id }, data });
  }

  async patch(id: number, data: subitems) {
    return this.prisma.subitems.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    return this.prisma.subitems.delete({ where: { id } });
  }
  async units() {
    return [
      { id: 1, description: "Unidade", description_code: "unit" },
      { id: 2, description: "Metro", description_code: "meter" },
      { id: 3, description: "Metro quadrado", description_code: "m2" },
      { id: 4, description: "Metro cúbico", description_code: "m3" },
      { id: 5, description: "Quilograma", description_code: "kg" },
      { id: 6, description: "Litro", description_code: "liter" },
      { id: 7, description: "Saco", description_code: "bag" },
      { id: 8, description: "Hora", description_code: "hour" },
      { id: 9, description: "Peça", description_code: "piece" },
      { id: 10, description: "Caixa", description_code: "box" },
      { id: 11, description: "Pacote", description_code: "package" },
      { id: 12, description: "Tonelada", description_code: "ton" },
      { id: 13, description: "Milheiro", description_code: "thousand" },
    ];
  }
}
