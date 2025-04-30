import { Module } from "@nestjs/common";
import { StatusController } from "src/modules/status/controller/status.controller";
import { StatusService } from "src/modules/status/services/status.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  exports: [StatusService],
  controllers: [StatusController],
  providers: [StatusService, PrismaService],
})
export class StatusModule {}
