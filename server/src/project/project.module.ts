import {Module} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ProjectController} from './project.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Project} from "./entities/project.entity";
import {Student} from "../student/entities/student.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Project, Student])],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {
}
