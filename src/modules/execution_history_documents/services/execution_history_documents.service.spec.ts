import { Test, TestingModule } from "@nestjs/testing";
import { ExecutionHistoryDocumentsService } from "../execution_history_documents.service";

describe("ExecutionHistoryDocumentsService", () => {
  let service: ExecutionHistoryDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionHistoryDocumentsService],
    }).compile();

    service = module.get<ExecutionHistoryDocumentsService>(
      ExecutionHistoryDocumentsService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
