import {Controller, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {InjectRepository} from "@nestjs/typeorm";
import {Passport} from "../passport/entities/passport.entity";
import {Repository} from "typeorm";
import {CustomerCompany} from "../customer-company/entities/customer-company.entity";
import {PassportService} from "../passport/passport.service";
import {CustomerCompanyService} from "../customer-company/customer-company.service";

@Controller('customer-user')
export class CustomerUserController {
}
