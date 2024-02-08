import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CustomerUser} from "./entities/customer-user.entity";
import {CreateCustomerUserDto} from "./dto/create-customer-user.dto";
import {UpdateProjectDto} from "../project/dto/update-project.dto";
import {UpdateCustomerUserDto} from "./dto/update-customer-user.dto";

@Injectable()
export class CustomerUserService {
    constructor(
        @InjectRepository(CustomerUser)
        private readonly customerUserRepository: Repository<CustomerUser>,
    ) {
    }

    async isCreate(id: number) {
        const customerUser = await this.customerUserRepository.findOneBy({id})
        return !!customerUser;
    }

    async create(createCustomerUserDto: CreateCustomerUserDto) {
        const isCustomerCompanyExist = await this.customerUserRepository.existsBy({id: createCustomerUserDto.id})

        if (isCustomerCompanyExist)
            throw new BadRequestException("The customer company already exist!");

        const newCustomerUser = {
            id: createCustomerUserDto.id,
            username: createCustomerUserDto.username,
            email: createCustomerUserDto.email,
            first_name: createCustomerUserDto.first_name,
            last_name: createCustomerUserDto.last_name,
            middle_name: createCustomerUserDto.middle_name,
            phone: createCustomerUserDto.phone,
            qualification: createCustomerUserDto.qualification,
            customer_company: {id: createCustomerUserDto.customer_company_id}
        };

        const res = await this.customerUserRepository.save(newCustomerUser);
        return {customerCompanyID: res.id}
    }

    async update(id: number, updateCustomerUserDto: UpdateCustomerUserDto) {
        const customerUser = await this.customerUserRepository.findOneBy({id})

        if (!customerUser)
            throw new NotFoundException("Customer user not found!")

        await this.customerUserRepository.update(customerUser.id, {
            id: updateCustomerUserDto.id,
            username: updateCustomerUserDto.username,
            email: updateCustomerUserDto.email,
            first_name: updateCustomerUserDto.first_name,
            last_name: updateCustomerUserDto.last_name,
            middle_name: updateCustomerUserDto.middle_name,
            phone: updateCustomerUserDto.phone,
            qualification: updateCustomerUserDto.qualification,
            customer_company: {id: updateCustomerUserDto.customer_company_id}
        });

        return this.customerUserRepository.findOne({
            where: {id},
        })
    }
}
