import { Module } from "@nestjs/common";
import { ClientsController } from "./controller/clients.controller";
import { ClientsService } from "./services/clients.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  exports: [ClientsService],
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
})
export class ClientsModule {}
