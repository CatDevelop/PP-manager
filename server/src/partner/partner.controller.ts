import {Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {PartnerService} from './partner.service';
import {ParsePassportsDto} from "./dto/parse-passports.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ParsePassportDto} from "./dto/parse-passport.dto";

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

    @Post("passport/parse/:id")
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    parsePassport(@Param('id', ParseIntPipe) id: number, @Body() parsePassportDto: ParsePassportDto) {
        return this.partnerService.parseAndCreatePassport({...parsePassportDto, id});
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
