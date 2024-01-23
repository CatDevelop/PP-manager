import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {TeamprojectService} from './teamproject.service';
import {ParseTeamprojectDto} from './dto/parse-teamproject.dto';

@Controller('teamproject')
export class TeamprojectController {
    constructor(private readonly teamprojectService: TeamprojectService) {
    }

    @Post()
    @UsePipes(new ValidationPipe())
    parse(@Body() parseProjectsDto: ParseTeamprojectDto) {
        return this.teamprojectService.parse(parseProjectsDto);
    }
}
