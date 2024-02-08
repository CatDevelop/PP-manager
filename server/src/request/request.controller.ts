import {Controller, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import {RequestService} from './request.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService) {
    }

    @Get("/all/:period_id")
    @UseGuards(JwtAuthGuard)
    findAll(@Param('period_id', ParseIntPipe) period_id: number) {
        return this.requestService.findAll({period_id});
    }
}
