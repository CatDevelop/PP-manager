import {Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards} from '@nestjs/common';
import {PassportService} from './passport.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UpdatePassportDto} from "./dto/update-passport.dto";

@Controller('passport')
export class PassportController {
  constructor(private readonly passportService: PassportService) {

  }

  @Get("/all/:period_id")
  @UseGuards(JwtAuthGuard)
  findAll(@Param('period_id', ParseIntPipe) period_id: number) {
    return this.passportService.findAll({period_id});
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.passportService.findOne({id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassportDto: UpdatePassportDto) {
    return this.passportService.update(+id, updatePassportDto);
  }
}
