import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Project} from "./entities/project.entity";
import {Repository} from "typeorm";
import {FindAllProjectsDto} from "./dto/find-all-projects.dto";
import {Student} from "../student/entities/student.entity";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {
    }

    async create(createProjectDto: CreateProjectDto) {
        const isProjectExist = await this.projectRepository.existsBy({id: createProjectDto.project.id})

        if (isProjectExist)
            throw new BadRequestException("The project already exist!");

        // let students = []
        // createProjectDto.team.thematicGroups.forEach((group, groupIndex) => {
        //     group.students.forEach((student, studentIndex) => {
        //         if (!students.find(s => s.key === student.userId))
        //             students.push(
        //                 {
        //                     key: student.userId,
        //                     fullname: student.fullname
        //                 }
        //             )
        //     })
        // })

        const newProject = {
            id: createProjectDto.project.id,
            passport: createProjectDto.project.passportNumber,
            name: createProjectDto.project.title,
            students: createProjectDto.students.map(student => ({id: student})),
            curator: createProjectDto.project.mainCurator.fullname,
            // @ts-ignore
            year: createProjectDto.details.period.year,
            // @ts-ignore
            term: createProjectDto.details.period.term,
            // @ts-ignore
            isHaveReport: !!createProjectDto.documents.reportId,
            // @ts-ignore
            isHavePresentation: !!createProjectDto.documents.presentationId,
            // @ts-ignore
            comissionScore: createProjectDto.results.expertsScore,
            // @ts-ignore
            status: createProjectDto.results.status ? createProjectDto.results.status.isProjectCompleted ? "Завершённый" : "Активный" : "#ОШИБКА",

            details: JSON.stringify(createProjectDto.details) ,
            results: JSON.stringify(createProjectDto.results || {}),
            documents:  JSON.stringify(createProjectDto.documents),
            team:  JSON.stringify(createProjectDto.team),
        };

        const res = await this.projectRepository.save(newProject);
        return {projectID: res.id}
    }

    async findAll(findAllProjectsDto: FindAllProjectsDto) {
        const projects = await this.projectRepository.find({
            where: {year: findAllProjectsDto.year, term: findAllProjectsDto.term},
            select: {
                id: true,
                passport: true,
                name: true,
                students: true,
                curator: true,
                year: true,
                term: true,
                isHaveReport: true,
                isHavePresentation: true,
                comissionScore: true,
                status: true,
                updated_at: true
            },
            relations: {
                students: true
            }
        })

        return projects
    }

    async findOne(id: string) {
        const isExist = await this.projectRepository.existsBy({id})

        if (!isExist)
            throw new NotFoundException("Project not found!")

        return await this.projectRepository.findOne({
                where: {id},
            },
        )
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
        const project = await this.projectRepository.findOneBy({id})

        if (!project)
            throw new NotFoundException("Project not found!")

        if ("students" in updateProjectDto) {
            const studentsExists = await this.studentRepository.countBy(
                updateProjectDto.students.map(student => ({id: student}))
            )

            if (updateProjectDto.students.length !== 0 && studentsExists !== updateProjectDto.students.length)
                throw new BadRequestException("The student does not exist!");

            await this.projectRepository.save({
                ...project,
                students: updateProjectDto.students.map(student => ({id: student}))
            })
            delete updateProjectDto["students"];
        }

        await this.projectRepository.update(project.id, {
            passport: updateProjectDto.project.passportNumber,
            name: updateProjectDto.project.title,
            // students: JSON.stringify(students),
            curator: updateProjectDto.project.mainCurator.fullname,
            // @ts-ignore
            year: updateProjectDto.details.period.year,
            // @ts-ignore
            term: updateProjectDto.details.period.term,
            // @ts-ignore
            isHaveReport: !!updateProjectDto.documents.reportId,
            // @ts-ignore
            isHavePresentation: !!updateProjectDto.documents.presentationId,
            // @ts-ignore
            comissionScore: updateProjectDto.results.expertsScore,
            // @ts-ignore
            status: updateProjectDto.results.status ? updateProjectDto.results.status.isProjectCompleted ? "Завершённый" : "Активный" : "#ОШИБКА",


            details: JSON.stringify(updateProjectDto.details) ,
            results: JSON.stringify(updateProjectDto.results || {}),
            documents:  JSON.stringify(updateProjectDto.documents),
            team:  JSON.stringify(updateProjectDto.team),
        });

        return this.projectRepository.findOne({
            where: {id},
        })
    }

    remove(id: number) {
        return `This action removes a #${id} project`;
    }
}
