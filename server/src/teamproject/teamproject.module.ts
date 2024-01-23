import { Module } from '@nestjs/common';
import { TeamprojectService } from './teamproject.service';
import { TeamprojectController } from './teamproject.controller';

@Module({
  controllers: [TeamprojectController],
  providers: [TeamprojectService],
})
export class TeamprojectModule {}
