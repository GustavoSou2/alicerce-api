import { Injectable } from "@nestjs/common";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: users): Promise<users> {
    return this.prisma.users.create({ data });
  }

  async findAll(): Promise<users[]> {
    return this.prisma.users.findMany();
  }

  async findById(id: number): Promise<users | null> {
    return this.prisma.users.findUnique({ where: { id } });
  }
}
