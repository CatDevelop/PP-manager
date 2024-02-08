import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import {AnalyticService} from './analytic.service';
import {CreateAnalyticDto} from './dto/create-analytic.dto';
import {UpdateAnalyticDto} from './dto/update-analytic.dto';

@Controller('analytic')
export class AnalyticController {
    constructor(private readonly analyticService: AnalyticService) {
    }

    @Get("main/:period_id")
    getMainAnalytics(@Param('period_id', ParseIntPipe) period_id: number) {
        return this.analyticService.getMainAnalytics({period_id});
    }
}
