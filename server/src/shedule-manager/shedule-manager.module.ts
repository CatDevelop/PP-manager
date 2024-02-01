import { Module } from '@nestjs/common';
import { SheduleManagerService } from './shedule-manager.service';
import { SheduleManagerController } from './shedule-manager.controller';
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [SheduleManagerController],
  providers: [SheduleManagerService, ConfigService],
})
export class SheduleManagerModule {}
