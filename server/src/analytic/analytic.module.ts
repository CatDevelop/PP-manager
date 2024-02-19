import {Module} from '@nestjs/common';
import {AnalyticService} from './analytic.service';
import {AnalyticController} from './analytic.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Passport} from "../passport/entities/passport.entity";
import {Request} from "../request/entities/request.entity";
import {CustomerCompany} from "../customer-company/entities/customer-company.entity";
import {CustomerUser} from "../customer-user/entities/customer-user.entity";
import {PartnerService} from "../partner/partner.service";
import {PassportService} from "../passport/passport.service";
import {RequestService} from "../request/request.service";
import {CustomerCompanyService} from "../customer-company/customer-company.service";
import {CustomerUserService} from "../customer-user/customer-user.service";
import {Course} from "../course/entities/course.entity";
import {Tag} from "../tag/entities/tag.entity";
import {Period} from "../period/entities/period.entity";
import {PeriodService} from "../period/period.service";

@Module({
    imports: [TypeOrmModule.forFeature([Passport, Request, CustomerCompany, CustomerUser, Course, Tag, Period])],
    controllers: [AnalyticController],
    providers: [AnalyticService, PartnerService, PassportService, RequestService, CustomerCompanyService, CustomerUserService, PeriodService],
})
export class AnalyticModule {
}
