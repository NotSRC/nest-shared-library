import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from '../libs/logger/src';
import { LogLevel } from '@sentry/types';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesCrudModule, UserModule } from '../libs';

@Module({
  imports: [
    FilesCrudModule,
    UserModule,
    LoggerModule.register({
      dsn:
        'https://53b055ffb9de431f8b3869f701f3a7e6@o449858.ingest.sentry.io/5433558',
      debug: true,
      environment: 'dev',
      logLevel: LogLevel.Error,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: getMongoURI(),
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

function getMongoURI() {
  return `mongodb+srv://webportal-stage:s1lDTtPEdUOogknd@cluster0.kkbg1.mongodb.net/WebApp?retryWrites=true&w=majority`;
}
