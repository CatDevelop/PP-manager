import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TeamprojectModule} from './teamproject/teamproject.module';

@Module({
    imports: [
        TeamprojectModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
