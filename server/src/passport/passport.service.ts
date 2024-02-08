import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreatePassportDto} from "./dto/create-passport.dto";
import {Passport} from "./entities/passport.entity";
import {UpdateRequestDto} from "../request/dto/update-request.dto";
import {UpdatePassportDto} from "./dto/update-passport.dto";
import {FindAllProjectsDto} from "../project/dto/find-all-projects.dto";
import {FindAllPassportsDto} from "./dto/find-all-passports.dto";

@Injectable()
export class PassportService {
    constructor(
        @InjectRepository(Passport)
        private readonly passportRepository: Repository<Passport>,
    ) {
    }

    async isCreate(id: number) {
        const passport = await this.passportRepository.findOneBy({id})
        return !!passport;
    }

    async create(createPassportDto: CreatePassportDto) {
        const isPassportExist = await this.passportRepository.existsBy({id: createPassportDto.id})

        if (isPassportExist)
            throw new BadRequestException("The passport already exist!");

        const newPassport = {
            id: createPassportDto.id,
            uid: createPassportDto.uid,
            short_name: createPassportDto.short_name,
            diploma_name: createPassportDto.diploma_name,
            date: createPassportDto.date,
            team_count: createPassportDto.team_count,
            students_count: createPassportDto.students_count,
            request: {id: createPassportDto.request_id},
            course: createPassportDto.course.map(course => ({id: course})),
            kind: createPassportDto.kind,
            status: createPassportDto.status
        };

        const res = await this.passportRepository.save(newPassport);
        return {passportID: res.id}
    }

    async update(id: number, updatePassportDto: UpdatePassportDto) {
        const passport = await this.passportRepository.findOneBy({id})

        if (!passport)
            throw new NotFoundException("Passport not found!")

        await this.passportRepository.update(passport.id, {
            id: updatePassportDto.id,
            uid: updatePassportDto.uid,
            short_name: updatePassportDto.short_name,
            diploma_name: updatePassportDto.diploma_name,
            date: updatePassportDto.date,
            team_count: updatePassportDto.team_count,
            students_count: updatePassportDto.students_count,
            request: {id: updatePassportDto.request_id},
            kind: updatePassportDto.kind,
            status: updatePassportDto.status
            // course: updatePassportDto.course.map(course => ({id: course}))
        });

        return this.passportRepository.findOne({
            where: {id},
        })
    }

    async findAll(findAllPassportsDto: FindAllPassportsDto) {
        const passports = await this.passportRepository.find({
            where: {request: {period_id: {id: findAllPassportsDto.period_id}}},
            // select: {
            //     id: true,
            //     passport: true,
            //     name: true,
            //     students: true,
            //     curator: true,
            //     year: true,
            //     term: true,
            //     isHaveReport: true,
            //     isHavePresentation: true,
            //     comissionScore: true,
            //     status: true,
            //     updated_at: true
            // },
            relations: {
                request: {
                    period_id: true,
                    customer_user: {
                        customer_company: true
                    }
                },
                course: true,
            },
        })

        return passports
    }

}
