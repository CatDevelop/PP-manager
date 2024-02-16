import {Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {RequestService} from './request.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UpdatePassportDto} from "../passport/dto/update-passport.dto";
import {UpdateRequestDto} from "./dto/update-request.dto";

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService) {
    }

    @Get("/all/:period_id")
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findAll(@Param('period_id', ParseIntPipe) period_id: number) {
        return this.requestService.findAll({period_id});
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
        return this.requestService.update(+id, updateRequestDto);
    }
}
