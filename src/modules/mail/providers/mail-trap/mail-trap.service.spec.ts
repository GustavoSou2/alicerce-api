import { Test, TestingModule } from '@nestjs/testing';
import { MailTrapService } from './mail-trap.service';

describe('MailTrapService', () => {
  let service: MailTrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailTrapService],
    }).compile();

    service = module.get<MailTrapService>(MailTrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
