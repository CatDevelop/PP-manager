import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TeamprojectModule} from './teamproject/teamproject.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectModule} from './project/project.module';

@Module({
    imports: [
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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
