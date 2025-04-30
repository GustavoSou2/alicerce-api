import { Module } from "@nestjs/common";
import { RolesController } from "./controller/roles.controller";
import { RolesService } from "./services/roles.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService],
  exports: [RolesService],
})
export class RolesModule {}
