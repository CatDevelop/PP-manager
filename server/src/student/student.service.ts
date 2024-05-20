import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateStudentDto} from './dto/create-student.dto';
import {UpdateStudentDto} from './dto/update-student.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Student} from "./entities/student.entity";
import {FindOneStudentDto} from "./dto/find-one-student.dto";
import {FindAllStudentsDto} from "./dto/find-all-students.dto";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {
    }

    async isCreate(id: number) {
        const student = await this.studentRepository.findOneBy({id})
        return !!student;
    }

    async create(createStudentDto: CreateStudentDto) {
        if (await this.isCreate(createStudentDto.id))
            throw new BadRequestException("The student already exist!");

        const newStudent = {
            id: createStudentDto.id,
            fullname: createStudentDto.fullname,
            email: createStudentDto.email,
            phone: createStudentDto.phone,
            groupName: createStudentDto.groupName,
        };

        const res = await this.studentRepository.save(newStudent);
        return {passportID: res.id}
    }

    async findAll(findAllStudentsDto: FindAllStudentsDto) {
        console.log(findAllStudentsDto.options)

        const where = {
            projects: {period: {id: findAllStudentsDto.period_id}},
        }

        const studentsCount = await this.studentRepository.countBy({projects: {period: {id: findAllStudentsDto.period_id}}})
        const students = await this.studentRepository.find({
            where: {projects: {period: {id: findAllStudentsDto.period_id}}},
            take: findAllStudentsDto.itemCountOnPage,
            skip: (findAllStudentsDto.page - 1) * findAllStudentsDto.itemCountOnPage,
            order: {id: "asc"},
            select: {
                projects: {
                    id: true,
                    name: true,
                    curator: true,
                    isHaveReport: true,
                    isHavePresentation: true,
                    comissionScore: true,
                    status: true,
                },
            },
            relations: {
                // projects_result: true,
                projects: {
                    period: true,
                    passport: {
                        request: {
                            period_id: true
                        }
                    },
                    students_result: true
                }
            }
        })

        return {students, meta: {studentsCount, pageCount: Math.ceil(studentsCount / findAllStudentsDto.itemCountOnPage)}}
    }

    async findOne(findOneStudentDto: FindOneStudentDto) {
        if (!await this.isCreate(findOneStudentDto.id))
            throw new NotFoundException("Student not found!")

        const student = await this.studentRepository.findOne({
            where: {id: findOneStudentDto.id, projects: {students_result: {student: {id: findOneStudentDto.id}}}},
            select: {
                projects: {
                    id: true,
                    name: true,
                    curator: true,
                    isHaveReport: true,
                    isHavePresentation: true,
                    comissionScore: true,
                    status: true,
                    // documents: true,
                    students_result: true,
                }
            },
            relations: {
                projects: {
                    students_result: true,
                    period: true,
                    passport: {
                        request: {
                            period_id: true,
                            tags: true,
                            customer_user: {
                                customer_company: true
                            }
                        }
                    },
                }
            },

        })

        return student
    }

    async update(id: number, updateStudentDto: UpdateStudentDto) {
        const student = await this.studentRepository.findOneBy({id})

        if (!student)
            throw new NotFoundException("Student not found!")

        if (Object.keys(updateStudentDto).length > 0)
            // @ts-ignore
            await this.studentRepository.update(student.id, updateStudentDto);

        return this.studentRepository.findOne({
            where: {id},
        })
    }

    remove(id: number) {
        return `This action removes a #${id} student`;
    }
}
