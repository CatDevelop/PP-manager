import {Body, Controller, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {TeamprojectService} from './teamproject.service';
import {ParseTeamprojectDto} from './dto/parse-teamproject.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('teamproject')
export class TeamprojectController {
    constructor(private readonly teamprojectService: TeamprojectService) {
    }

    @Post("parse")
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    parse(@Body() parseProjectsDto: ParseTeamprojectDto) {
        return this.teamprojectService.parse(parseProjectsDto);
    }

    @Post("report")
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    createReport(@Body() parseProjectsDto: ParseTeamprojectDto) {
        return this.teamprojectService.createReport(parseProjectsDto);
    }
}
