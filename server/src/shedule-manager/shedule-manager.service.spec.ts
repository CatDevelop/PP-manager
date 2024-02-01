import { Test, TestingModule } from '@nestjs/testing';
import { SheduleManagerService } from './shedule-manager.service';

describe('SheduleManagerService', () => {
  let service: SheduleManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheduleManagerService],
    }).compile();

    service = module.get<SheduleManagerService>(SheduleManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
