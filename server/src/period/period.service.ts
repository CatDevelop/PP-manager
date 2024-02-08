import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Period} from "./entities/period.entity";
import {CreateProjectDto} from "../project/dto/create-project.dto";
import {CreatePeriodDto} from "./dto/create-period.dto";

@Injectable()
export class PeriodService {
    constructor(
        @InjectRepository(Period)
        private readonly periodRepository: Repository<Period>,
    ) {
    }

    async create(createPeriodDto: CreatePeriodDto) {
        const isPeriodExist = await this.periodRepository.existsBy({id: createPeriodDto.id})

        if (isPeriodExist)
            throw new BadRequestException("The period already exist!");

        await this.periodRepository.save(createPeriodDto);
    }
}
