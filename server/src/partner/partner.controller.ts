import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {PartnerService} from './partner.service';
import {ParsePassportsDto} from "./dto/parse-passports.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('partner')
export class PartnerController {
    constructor(private readonly partnerService: PartnerService) {
    }

    @Post("passport/parse")
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    parsePassports(@Body() parsePassportsDto: ParsePassportsDto) {
        return this.partnerService.parsePassports(parsePassportsDto);
    }

    @Post("request/parse")
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    parseRequest(@Body() parseRequestsDto: ParsePassportsDto) {
        return this.partnerService.parseRequests(parseRequestsDto);
    }

    @Post("request/report")
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    createReport() {
        return this.partnerService.createRequestReport();
    }

    @Get("token")
    @UseGuards(JwtAuthGuard)
    getTokens() {
        return this.partnerService.getTokens();
    }
}
