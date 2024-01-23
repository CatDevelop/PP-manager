import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import cors from 'cors'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        //Add your origins here
        origin: "https://pp-manager.netlify.app",
    });
    await app.listen(5000);
}

bootstrap();
