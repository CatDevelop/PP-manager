import { Test, TestingModule } from '@nestjs/testing';
import { TeamprojectService } from './teamproject.service';

describe('TeamprojectService', () => {
  let service: TeamprojectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamprojectService],
    }).compile();

    service = module.get<TeamprojectService>(TeamprojectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
