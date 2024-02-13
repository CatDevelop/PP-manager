import {Module} from '@nestjs/common';
import {PartnerService} from './partner.service';
import {PartnerController} from './partner.controller';
import {PassportService} from "../passport/passport.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Passport} from "../passport/entities/passport.entity";
import {RequestService} from "../request/request.service";
import {Request} from "../request/entities/request.entity";
import {CustomerCompanyService} from "../customer-company/customer-company.service";
import {CustomerCompany} from "../customer-company/entities/customer-company.entity";
import {CustomerUser} from "../customer-user/entities/customer-user.entity";
import {CustomerUserService} from "../customer-user/customer-user.service";
import {Course} from "../course/entities/course.entity";
import {CourseService} from "../course/course.service";
import {Tag} from "../tag/entities/tag.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Passport, Request, CustomerCompany, CustomerUser, Course, Tag])],
    controllers: [PartnerController],
    providers: [PartnerService, PassportService, RequestService, CourseService, CustomerCompanyService, CustomerUserService],
})
export class PartnerModule {
}
