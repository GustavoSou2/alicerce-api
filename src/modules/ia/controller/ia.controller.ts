import { Controller } from "@nestjs/common";
import { IaService } from "src/modules/ia/services/ia.service";

@Controller("ia")
export class IaController {
  constructor(private readonly iaService: IaService) {}
}
