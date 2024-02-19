import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateStudentDto} from './dto/create-student.dto';
import {UpdateStudentDto} from './dto/update-student.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Student} from "./entities/student.entity";
import {CreatePassportDto} from "../passport/dto/create-passport.dto";
import {UpdatePassportDto} from "../passport/dto/update-passport.dto";
import {FindOnePassportDto} from "../passport/dto/find-one-passport.dto";
import {FindOneStudentDto} from "./dto/find-one-student.dto";

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

    findAll() {
        return `This action returns all student`;
    }

    async findOne(findOneStudentDto: FindOneStudentDto) {
        if (!await this.isCreate(findOneStudentDto.id))
            throw new NotFoundException("Student not found!")

        const student = await this.studentRepository.findOne({
            where: {id: findOneStudentDto.id},
            relations: {
                projects: {
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
