import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // NOTE: compression
    app.use(compression());

    // NOTE: added security
    app.use(helmet());

    // Enable CORS
    app.enableCors({
        origin: ['http://localhost:5173'],
        credentials: true,
    });

    // Enable validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            errorHttpStatusCode: 422,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // Enable class serializer interceptor
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    await app.listen(process.env.PORT || 3000);
    console.log(`Application is running on: http://localhost:${process.env.PORT}`);

    // Graceful shutdown for SIGINT signal (Ctrl+C) in development mode
    process.on('SIGINT', async () => {
        console.log('Received SIGINT, shutting down gracefully');
        await app.close();
        process.exit(0);
    });
}

void bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});
