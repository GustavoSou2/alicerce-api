import { Test, TestingModule } from "@nestjs/testing";
import { ExecutionReportsService } from "../execution-reports.service";

describe("ExecutionReportsService", () => {
  let service: ExecutionReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionReportsService],
    }).compile();

    service = module.get<ExecutionReportsService>(ExecutionReportsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
