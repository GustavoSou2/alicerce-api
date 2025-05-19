import { Test, TestingModule } from "@nestjs/testing";
import { ActionPlanDocumentsService } from "../action_plan_documents.service";

describe("ActionPlanDocumentsService", () => {
  let service: ActionPlanDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionPlanDocumentsService],
    }).compile();

    service = module.get<ActionPlanDocumentsService>(
      ActionPlanDocumentsService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
