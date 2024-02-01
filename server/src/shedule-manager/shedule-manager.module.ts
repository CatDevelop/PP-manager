import { Module } from '@nestjs/common';
import { SheduleManagerService } from './shedule-manager.service';
import { SheduleManagerController } from './shedule-manager.controller';

@Module({
  controllers: [SheduleManagerController],
  providers: [SheduleManagerService],
})
export class SheduleManagerModule {}
