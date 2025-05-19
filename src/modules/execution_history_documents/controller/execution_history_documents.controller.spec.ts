import { Test, TestingModule } from "@nestjs/testing";
import { ExecutionHistoryDocumentsController } from "../execution_history_documents.controller";
import { ExecutionHistoryDocumentsService } from "../services/execution_history_documents.service";

describe("ExecutionHistoryDocumentsController", () => {
  let controller: ExecutionHistoryDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutionHistoryDocumentsController],
      providers: [ExecutionHistoryDocumentsService],
    }).compile();

    controller = module.get<ExecutionHistoryDocumentsController>(
      ExecutionHistoryDocumentsController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
