import {Injectable} from '@nestjs/common';
import {CreateAnalyticDto} from './dto/create-analytic.dto';
import {UpdateAnalyticDto} from './dto/update-analytic.dto';
import {PassportService} from "../passport/passport.service";
import {RequestService} from "../request/request.service";
import {CustomerCompanyService} from "../customer-company/customer-company.service";
import {CustomerUserService} from "../customer-user/customer-user.service";
import {GetMainAnalyticsDto} from "./dto/get-main-analytics.dto";

@Injectable()
export class AnalyticService {
    constructor(
        private readonly passportService: PassportService,
        private readonly requestService: RequestService,
        private readonly customerCompanyService: CustomerCompanyService,
        private readonly customerUserService: CustomerUserService,
    ) {
    }

    async getMainAnalytics(getMainAnalyticsDto: GetMainAnalyticsDto) {
        const requests = await this.requestService.findAll(getMainAnalyticsDto)
        const passports = await this.passportService.findAll(getMainAnalyticsDto)

        const availableSeatsCount = passports.reduce((accumulator, currentValue) => accumulator + (currentValue.team_count * currentValue.students_count), 0)

        return {
            requests_count: requests.length,
            passports_count: passports.length,
            projects_count: 0,
            customer_company_count: 0,
            available_seats_count: availableSeatsCount
        };
    }

    findAll() {
        return `This action returns all analytic`;
    }

    findOne(id: number) {
        return `This action returns a #${id} analytic`;
    }

    update(id: number, updateAnalyticDto: UpdateAnalyticDto) {
        return `This action updates a #${id} analytic`;
    }

    remove(id: number) {
        return `This action removes a #${id} analytic`;
    }
}
