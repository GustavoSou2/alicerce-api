import { Test, TestingModule } from "@nestjs/testing";
import { ClientsController } from "src/clients/controller/clients.controller";

describe("ClientsController", () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
