import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @Get(':year/:term')
    findAll(@Param('year', ParseIntPipe) year: number, @Param('term', ParseIntPipe) term: number) {
        return this.projectService.findAll({year, term});
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOne(id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    //     return this.projectService.update(+id, updateProjectDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.projectService.remove(+id);
    // }
}
