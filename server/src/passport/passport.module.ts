import {Module} from '@nestjs/common';
import {PassportService} from './passport.service';
import {PassportController} from './passport.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Passport} from "./entities/passport.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Passport])],
    controllers: [PassportController],
    providers: [PassportService],
})
export class PassportModule {
}
