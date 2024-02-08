import {Controller, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import {PassportService} from './passport.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('passport')
export class PassportController {
  constructor(private readonly passportService: PassportService) {

  }

  @Get("/all/:period_id")
  @UseGuards(JwtAuthGuard)
  findAll(@Param('period_id', ParseIntPipe) period_id: number) {
    return this.passportService.findAll({period_id});
  }
}
