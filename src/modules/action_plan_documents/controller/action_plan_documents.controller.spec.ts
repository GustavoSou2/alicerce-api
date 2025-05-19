import { Test, TestingModule } from '@nestjs/testing';
import { ActionPlanDocumentsController } from './action_plan_documents.controller';
import { ActionPlanDocumentsService } from './action_plan_documents.service';

describe('ActionPlanDocumentsController', () => {
  let controller: ActionPlanDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionPlanDocumentsController],
      providers: [ActionPlanDocumentsService],
    }).compile();

    controller = module.get<ActionPlanDocumentsController>(ActionPlanDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
