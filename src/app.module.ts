import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from '../libs/logger/src';
import { LogLevel } from '@sentry/types';

@Module({
  imports: [
    LoggerModule.register({
      dsn: 'https://53b055ffb9de431f8b3869f701f3a7e6@o449858.ingest.sentry.io/5433558',
      debug: true,
      environment: 'dev',
      logLevel: LogLevel.Error
    })
  ],
  controllers: [AppController],
})
export class AppModule {}
