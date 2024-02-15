import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {ConfigService} from "@nestjs/config";
import {PartnerService} from "../partner/partner.service";

@Injectable()
export class SheduleManagerService {
    constructor(
        private readonly configService: ConfigService,
        private readonly partnerService: PartnerService
    ) {
    }

    @Cron(CronExpression.EVERY_2_HOURS)
    async handleCron() {
        const tokens = await this.partnerService.getTokens();
        await this.partnerService.parseRequests(tokens);
        await this.partnerService.parsePassports(tokens);
    }
}
