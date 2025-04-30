import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
} from "@nestjs/common";
import { approval_flow, users } from "@prisma/client";
import { Request } from "express";
import { ApprovalFlowService } from "src/modules/approval-flow/services/approval-flow.service";

@Controller("approval-flow")
export class ApprovalFlowController {
  constructor(private readonly approvalFlowService: ApprovalFlowService) {}

  @Post()
  create(@Body() data: approval_flow, @Req() req: Request) {
    const { company_id, id } = req.user as users;
    return this.approvalFlowService.create({
      ...data,
      company_id: company_id!,
      created_by: id,
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as users;
    return this.approvalFlowService.findAll(user);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.approvalFlowService.findOne(+id);
  }

  @Patch(":id")
  patch(@Param("id") id: string, @Body() data: approval_flow) {
    return this.approvalFlowService.patch(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.approvalFlowService.remove(+id);
  }
}
