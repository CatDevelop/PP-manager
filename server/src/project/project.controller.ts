import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    @Get(':year/:term')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findAll(@Param('year', ParseIntPipe) year: number, @Param('term', ParseIntPipe) term: number) {
        return this.projectService.findAll({year, term});
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findOne(@Param('id') id: string) {
        return this.projectService.findOne(id);
    }
}
