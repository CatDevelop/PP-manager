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
        const students = await this.studentRepository.find({
            where: {projects: {passport: {request: {period_id: {id: findAllStudentsDto.period_id}}}}},
            select: {
                projects_result: {
                    id: true,
                    totalScore: true,
                    expertsScore: true,
                    finalScore: true,
                    retakedScore: true,
                    brsScore: true,
                    coefficient: true,
                    project: {
                        id: true
                    }
                },
                projects: {
                    id: true,
                    name: true,
                    curator: true,
                    isHaveReport: true,
                    isHavePresentation: true,
                    comissionScore: true,
                    status: true,
                }
            },
            relations: {
                projects_result: {
                    project: true
                },
                projects: {
                    period: true,
                    passport: {
                        request: {
                            period_id: true
                        }
                    },
                }
            }
        })

        return students
    }

    async findOne(findOneStudentDto: FindOneStudentDto) {
        if (!await this.isCreate(findOneStudentDto.id))
            throw new NotFoundException("Student not found!")

        const student = await this.studentRepository.findOne({
            where: {id: findOneStudentDto.id, projects: {students_result: {student: {id: findOneStudentDto.id}}}},
            relations: {
                // projects_result: true,
                projects: {
                    students_result: {
                        student: true
                    },
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
