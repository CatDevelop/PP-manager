import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {PeriodService} from './period.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreatePeriodDto} from "./dto/create-period.dto";

@Controller('period')
export class PeriodController {
    constructor(private readonly periodService: PeriodService) {
    }

    @Post('')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    createPeriod(@Body() createPeriodDto: CreatePeriodDto) {
        return this.periodService.create(createPeriodDto);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.periodService.findAll();
    }
}
