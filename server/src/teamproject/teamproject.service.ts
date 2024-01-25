import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ParseTeamprojectDto} from './dto/parse-teamproject.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Project} from "../project/entities/project.entity";
import {Repository} from "typeorm";
import {ProjectService} from "../project/project.service";

const XLSX = require('xlsx');
const JS_XLSX = require('js-xlsx');

@Injectable()
export class TeamprojectService {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly projectService: ProjectService
    ) {
    }

    async parse(parseProjectsDto: ParseTeamprojectDto) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + parseProjectsDto.token);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let projects = []

        let localProjects = await fetch(
            // @ts-ignore
            "https://teamproject.urfu.ru/api/v2/workspaces?status=any&year=" + parseProjectsDto.year + "&semester=" + parseProjectsDto.term + "&size=10000&page=1", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => {
                throw new UnauthorizedException()
            })
        projects.push(...localProjects.items)

        let i = 0
        let newProjectsCount = 0;
        let updatedProjectsCount = 0;
        // @ts-ignore
        for (const project of projects) {
            let details = {}
            let results = {}
            let documents = {}
            let team = {}
            i += 1;

            // @ts-ignore
            await fetch("https://teamproject.urfu.ru/api/v2/workspaces/" + project.id + "/documents/results", requestOptions)
                .then(response => response.json())
                .then(result => documents = result)
                .catch(error => console.log('error', error));

            // @ts-ignore
            await fetch("https://teamproject.urfu.ru/api/v2/workspaces/" + project.id + "/details", requestOptions)
                .then(response => response.json())
                .then(result => details = result)
                .catch(error => console.log('error', error));

            // @ts-ignore
            await fetch("https://teamproject.urfu.ru/api/v2/workspaces/" + project.id + "/result", requestOptions)
                .then(response => response.json())
                .then(result => results = result)
                .catch(error => console.log('error', error));

            // @ts-ignore
            await fetch("https://teamproject.urfu.ru/api/v2/workspaces/" + project.id + "/team", requestOptions)
                .then(response => response.json())
                .then(result => team = result)
                .catch(error => console.log('error', error));


            const projectBD = await this.projectRepository.findOneBy({id: project.id})

            console.log(i)
            if (!projectBD) {
                newProjectsCount += 1;
                await this.projectService.create({
                    project,
                    details,
                    team,
                    documents,
                    results
                })
            } else {
                updatedProjectsCount += 1;
                await this.projectService.update(project.id, {
                    project,
                    details,
                    team,
                    documents,
                    results
                })
            }
        }
        return {
            newProjectsCount,
            updatedProjectsCount
        }
    }

    async createReport(createReportDto: any) {
        // let projects = await this.parse(createReportDto)
        //
        // let workbook = XLSX.utils.book_new();
        //
        // let projectsSheet = {
        //     '!ref': 'A1:I' + (projects.length + 1), // Sheet Range (Which cells will be included in the output)
        //     'A1': {
        //         t: 's',
        //         v: 'Паспорт',
        //     },
        //     'B1': {
        //         t: 's',
        //         v: 'Название',
        //     },
        //     'C1': {
        //         t: 's',
        //         v: 'Участники',
        //     },
        //     'D1': {
        //         t: 's',
        //         v: 'Куратор',
        //     },
        //     'E1': {
        //         t: 's',
        //         v: 'Отчёт',
        //     },
        //     'F1': {
        //         t: 's',
        //         v: 'Презентация',
        //     },
        //     'G1': {
        //         t: 's',
        //         v: 'Оценка комиссии',
        //     },
        //     'H1': {
        //         t: 's',
        //         v: 'Статус',
        //     }
        // };
        //
        // projects.forEach((project, index) => {
        //     let students = []
        //     project.team.thematicGroups.forEach((group, groupIndex) => {
        //         group.students.forEach((student, studentIndex) => {
        //             if (!students.find(s => s.key === student.userId))
        //                 students.push(student.fullname)
        //         })
        //     })
        //
        //     projectsSheet["A" + (index + 2)] = {t: 's', v: project.project.passportNumber}
        //     projectsSheet["B" + (index + 2)] = {t: 's', v: project.project.title}
        //     projectsSheet["C" + (index + 2)] = {t: 's', v: students.join('\n')}
        //     projectsSheet["D" + (index + 2)] = {t: 's', v: project.project.mainCurator.fullname}
        //     projectsSheet["E" + (index + 2)] = {t: 's', v: project.documents.reportId ? "Да" : "Нет"}
        //     projectsSheet["F" + (index + 2)] = {t: 's', v: project.documents.presentationId ? "Да" : "Нет"}
        //     projectsSheet["G" + (index + 2)] = {t: project.results.expertsScore ? 'n' : 's', v: project.results.expertsScore || "Нет оценки"}
        //     projectsSheet["H" + (index + 2)] = {t: 's', v: project.results.status.isProjectCompleted ? "Завершённый" : "Активный"}
        //     projectsSheet["I" + (index + 2)] = {t: 's', v: "https://teamproject.urfu.ru/#/"+project.project.id+"/about"}
        // })
        //
        // let students = []
        //
        // projects.forEach(project => {
        //     project.team.thematicGroups.forEach((group, groupIndex) => {
        //         group.students.forEach((student, studentIndex) => {
        //             if(!students.find(s => s.key === student.userId))
        //                 students.push(
        //                     {
        //                         key: student.userId,
        //                         fullname: student.fullname,
        //                         group: student.groupName,
        //                         projectName: project.project.title,
        //                         projectKey: project.project.id,
        //                         curator: group.curator.fullname,
        //                         expertsScore: project.results.expertsScore || "Нет оценки",
        //                         finalScore: project.results.thematicGroups[groupIndex].students[studentIndex].finalScore || "Нет оценки",
        //                         retakedScore: project.results.thematicGroups[groupIndex].students[studentIndex].retakedScore || "Не пересдавал",
        //                     }
        //                 )
        //         })
        //     })
        // })
        //
        // let usersSheet = {
        //     '!ref': 'A1:H' + (students.length + 1), // Sheet Range (Which cells will be included in the output)
        //     'A1': {
        //         t: 's',
        //         v: 'ФИО',
        //     },
        //     'B1': {
        //         t: 's',
        //         v: 'Группа',
        //     },
        //     'C1': {
        //         t: 's',
        //         v: 'Название проекта',
        //     },
        //     'D1': {
        //         t: 's',
        //         v: 'Куратор',
        //     },
        //     'E1': {
        //         t: 's',
        //         v: 'Оценка комиссии',
        //     },
        //     'F1': {
        //         t: 's',
        //         v: 'Оценка студента',
        //     },
        //     'G1': {
        //         t: 's',
        //         v: 'Пересдача',
        //     },
        //     'H1': {
        //         t: 's',
        //         v: 'Ссылка на проект',
        //     }
        // };
        //
        //
        // students.forEach((student, index) => {
        //     usersSheet["A" + (index + 2)] = {t: 's', v: student.fullname}
        //     usersSheet["B" + (index + 2)] = {t: 's', v: student.group}
        //     usersSheet["C" + (index + 2)] = {t: 's', v: student.projectName}
        //     usersSheet["D" + (index + 2)] = {t: 's', v: student.curator}
        //     usersSheet["E" + (index + 2)] = {t: student.expertsScore === "Нет оценки" ? 's' : 'n', v: student.expertsScore}
        //     usersSheet["F" + (index + 2)] = {t: student.finalScore === "Нет оценки" ? 's' : 'n', v: student.finalScore}
        //     usersSheet["G" + (index + 2)] = {t: student.retakedScore === "Не пересдавал" ? 's' : 'n', v: student.retakedScore}
        //     usersSheet["H" + (index + 2)] = {t: 's', v: "https://teamproject.urfu.ru/#/"+student.projectKey+"/about"}
        // })
        //
        // XLSX.utils.book_append_sheet(workbook, projectsSheet, 'Проекты');
        // XLSX.utils.book_append_sheet(workbook, usersSheet, 'Студенты');
        // JS_XLSX.writeFile(workbook, 'Отчёт.xlsx');
        // console.log(1)
    }
}
