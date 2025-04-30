import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, it } from "node:test";
import { StatusController } from "src/modules/status/controller/status.controller";

describe("StatusController", () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
