import { Test, TestingModule } from "@nestjs/testing";
import { ExecutionReportsController } from "../execution-reports.controller";
import { ExecutionReportsService } from "../execution-reports.service";

describe("ExecutionReportsController", () => {
  let controller: ExecutionReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutionReportsController],
      providers: [ExecutionReportsService],
    }).compile();

    controller = module.get<ExecutionReportsController>(
      ExecutionReportsController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
