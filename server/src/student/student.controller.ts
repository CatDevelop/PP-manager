import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query} from '@nestjs/common';
import {StudentService} from './student.service';
import {CreateStudentDto} from './dto/create-student.dto';
import {UpdateStudentDto} from './dto/update-student.dto';
import {FindAllStudentsDto} from "./dto/find-all-students.dto";

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {
    }

    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.create(createStudentDto);
    }

    @Get('all/:period_id')
    findAll(
        @Param('period_id', ParseIntPipe) period_id: number,
        @Query('page') page: number,
        @Query('itemCountOnPage') itemCountOnPage  : number,
        @Body() body: { options: any }
    ) {
        return this.studentService.findAll({period_id, page, itemCountOnPage, options: body.options});
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.studentService.findOne({id});
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentService.update(+id, updateStudentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.studentService.remove(+id);
    }
}
