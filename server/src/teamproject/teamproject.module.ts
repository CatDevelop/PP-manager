import {Module} from '@nestjs/common';
import {TeamprojectService} from './teamproject.service';
import {TeamprojectController} from './teamproject.controller';
import {Project} from "../project/entities/project.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectService} from "../project/project.service";
import {StudentService} from "../student/student.service";
import {Student} from "../student/entities/student.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Project, Student])],
    controllers: [TeamprojectController],
    providers: [TeamprojectService, ProjectService, StudentService],
})
export class TeamprojectModule {
}
