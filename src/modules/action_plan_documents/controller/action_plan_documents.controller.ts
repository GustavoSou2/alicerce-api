import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { action_plan_document } from "@prisma/client";
import { ActionPlanDocumentsService } from "src/modules/action_plan_documents/services/action_plan_documents.service";
@Controller("action-plan-documents")
export class ActionPlanDocumentsController {
  constructor(
    private readonly actionPlanDocumentsService: ActionPlanDocumentsService,
  ) {}

  @Post()
  create(@Body() createActionPlanDocumentDto: action_plan_document) {
    return this.actionPlanDocumentsService.create(createActionPlanDocumentDto);
  }

  @Get()
  findAll() {
    return this.actionPlanDocumentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.actionPlanDocumentsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateActionPlanDocumentDto: action_plan_document,
  ) {
    return this.actionPlanDocumentsService.update(
      +id,
      updateActionPlanDocumentDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actionPlanDocumentsService.remove(+id);
  }
}
