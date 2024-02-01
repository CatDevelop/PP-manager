import { Test, TestingModule } from '@nestjs/testing';
import { SheduleManagerController } from './shedule-manager.controller';
import { SheduleManagerService } from './shedule-manager.service';

describe('SheduleManagerController', () => {
  let controller: SheduleManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheduleManagerController],
      providers: [SheduleManagerService],
    }).compile();

    controller = module.get<SheduleManagerController>(SheduleManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
