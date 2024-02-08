import {Controller, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import {CustomerCompanyService} from './customer-company.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('customer-company')
export class CustomerCompanyController {
  constructor(private readonly customerCompanyService: CustomerCompanyService) {}

  @Get("/all/:period_id")
  @UseGuards(JwtAuthGuard)
  findAll(@Param('period_id', ParseIntPipe) period_id: number) {
    return this.customerCompanyService.findAll({period_id});
  }
}
