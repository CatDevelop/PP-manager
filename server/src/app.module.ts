import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TeamprojectModule} from './teamproject/teamproject.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectModule} from './project/project.module';
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import { PartnerModule } from './partner/partner.module';
import {ScheduleModule} from "@nestjs/schedule";
import { SheduleManagerModule } from './shedule-manager/shedule-manager.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TeamprojectModule,
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                synchronize: true,
                entities: [__dirname + "/**/*.entity{.js, .ts}"]
            }),
            inject: [ConfigService]
        }),
        ProjectModule,
        UserModule,
        AuthModule,
        PartnerModule,
        SheduleManagerModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
