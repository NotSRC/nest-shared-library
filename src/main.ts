import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DmLoggerService } from '../libs/logger/src';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function createDocumentation(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Auth example')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(DmLoggerService));
  createDocumentation(app);
  await app.listen(4300);
}

bootstrap();
