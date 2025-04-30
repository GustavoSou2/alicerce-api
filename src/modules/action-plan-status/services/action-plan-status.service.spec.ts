import { Test, TestingModule } from '@nestjs/testing';
import { ActionPlanStatusService } from './action-plan-status.service';

describe('ActionPlanStatusService', () => {
  let service: ActionPlanStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionPlanStatusService],
    }).compile();

    service = module.get<ActionPlanStatusService>(ActionPlanStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
