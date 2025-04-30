import { Module } from "@nestjs/common";
import { IaService } from "src/modules/ia/services/ia.service";
import { IaController } from "./controller/ia.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [IaService, JwtService],
  controllers: [IaController],
})
export class IaModule {}
