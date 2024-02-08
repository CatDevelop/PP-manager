import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateRequestDto} from './dto/create-request.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Request} from "./entities/request.entity"
import {UpdateCustomerUserDto} from "../customer-user/dto/update-customer-user.dto";
import {UpdateRequestDto} from "./dto/update-request.dto";
import {FindAllPassportsDto} from "../passport/dto/find-all-passports.dto";

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>,
    ) {
    }

    async isCreate(id: number) {
        const request = await this.requestRepository.findOneBy({id})
        return !!request;
    }

    async create(createRequestDto: CreateRequestDto) {
        const isRequestExist = await this.requestRepository.existsBy({id: createRequestDto.id})

        if (isRequestExist)
            throw new BadRequestException("The request already exist!");

        const newRequest = {
            id: createRequestDto.id,
            uid: createRequestDto.uid,
            name: createRequestDto.name,
            date: createRequestDto.date,
            goal: createRequestDto.goal,
            result: createRequestDto.result,
            status: createRequestDto.status,
            description: createRequestDto.description,
            criteria: createRequestDto.criteria,
            max_copies: createRequestDto.max_copies,
            period_id: {id: createRequestDto.period_id},
            // customer_company: {id: createRequestDto.customer_company_id}
            customer_user: {id: createRequestDto.customer_user_id}
        };

        const res = await this.requestRepository.save(newRequest);
        return {requestID: res.id}
    }

    async update(id: number, updateRequestDto: UpdateRequestDto) {
        const request = await this.requestRepository.findOneBy({id})

        if (!request)
            throw new NotFoundException("Request not found!")

        await this.requestRepository.update(request.id, {
            uid: updateRequestDto.uid,
            name: updateRequestDto.name,
            date: updateRequestDto.date,
            goal: updateRequestDto.goal,
            result: updateRequestDto.result,
            status: updateRequestDto.status,
            description: updateRequestDto.description,
            criteria: updateRequestDto.criteria,
            max_copies: updateRequestDto.max_copies,
            period_id: {id: updateRequestDto.period_id},
            customer_user: {id: updateRequestDto.customer_user_id}
        });

        return this.requestRepository.findOne({
            where: {id},
        })
    }

    async findAll(findAllPassportsDto: FindAllPassportsDto) {
        const requests = await this.requestRepository.find({
            where: {period_id: {id: findAllPassportsDto.period_id}},
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
                passports: true,
                period_id: true,
                customer_user: {
                    customer_company: true
                }
            },
        })

        return requests
    }
}
