import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger conf
  const config = new DocumentBuilder()
    .setTitle('ToDo API')
    .setDescription('Документация API для ToDo-приложения')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('/api', app, document, swaggerOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
