import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import {PartnerService} from './partner.service';
import {CreatePartnerDto} from './dto/create-partner.dto';
import {UpdatePartnerDto} from './dto/update-partner.dto';
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

    @Get("token")
    @UseGuards(JwtAuthGuard)
    getTokens() {
        return this.partnerService.getTokens();
    }
}
