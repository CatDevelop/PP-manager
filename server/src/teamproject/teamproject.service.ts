import {Injectable} from '@nestjs/common';
import {ParseTeamprojectDto} from './dto/parse-teamproject.dto';
import {UpdateTeamprojectDto} from './dto/update-teamproject.dto';

@Injectable()
export class TeamprojectService {
    async parse(parseProjectsDto: ParseTeamprojectDto) {
        let returnResult = []
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + parseProjectsDto.token);
        console.log(parseProjectsDto)
        console.log("Bearer " + parseProjectsDto.token)
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // @ts-ignore
        let periods = await fetch("https://teamproject.urfu.ru/api/v2/periods", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));

        let projects = []

        for (const period of periods.periods) {
            let localProjects = await fetch(
                // @ts-ignore
                "https://teamproject.urfu.ru/api/v2/workspaces?status=any&year=" + period.year + "&semester=" + period.term + "&size=10000&page=1", requestOptions)
                .then(response => response.json())
                .then(result => result)
                .catch(error => console.log('error', error))
            console.log(period, projects.length)
            projects.push(...localProjects.items)
        }

        let i = 0
        // @ts-ignore
        for (const project of projects) {
            let details = {}
            let results = {}
            let documents = {}
            let team = {}
            console.log(i)
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

            returnResult.push({project, details, results, documents, team})
        }
        return returnResult;
    }
}
