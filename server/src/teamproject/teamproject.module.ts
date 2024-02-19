import {Module} from '@nestjs/common';
import {TeamprojectService} from './teamproject.service';
import {TeamprojectController} from './teamproject.controller';
import {Project} from "../project/entities/project.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectService} from "../project/project.service";
import {StudentService} from "../student/student.service";
import {Student} from "../student/entities/student.entity";
import {Passport} from "../passport/entities/passport.entity";
import {PeriodService} from "../period/period.service";
import {Period} from "../period/entities/period.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Project, Student, Passport, Period])],
    controllers: [TeamprojectController],
    providers: [TeamprojectService, ProjectService, StudentService, PeriodService],
})
export class TeamprojectModule {
}
