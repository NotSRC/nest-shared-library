import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DmLoggerService } from '../libs/logger/src';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(DmLoggerService));
  await app.listen(4300);
}

bootstrap();
