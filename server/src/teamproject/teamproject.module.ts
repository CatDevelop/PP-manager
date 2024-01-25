import {Module} from '@nestjs/common';
import {TeamprojectService} from './teamproject.service';
import {TeamprojectController} from './teamproject.controller';
import {Project} from "../project/entities/project.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectService} from "../project/project.service";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    controllers: [TeamprojectController],
    providers: [TeamprojectService, ProjectService],
})
export class TeamprojectModule {
}
