import { Test, TestingModule } from '@nestjs/testing';
import { TeamprojectController } from './teamproject.controller';
import { TeamprojectService } from './teamproject.service';

describe('TeamprojectController', () => {
  let controller: TeamprojectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamprojectController],
      providers: [TeamprojectService],
    }).compile();

    controller = module.get<TeamprojectController>(TeamprojectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
