import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  INestApplication,
  Inject,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DmTestService } from '../libs/dm-test/dm-test.service';
import { DmTestModule } from '../libs/dm-test/dm-test.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

let appInstance: INestApplication;

export async function GetE2eApplication(): Promise<INestApplication> {
  if (appInstance) {
    return new Promise((resolve) => resolve(appInstance));
  }

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
      DmTestModule.forRootAsync({
        useFactory: async () => {
          // console.log(configService);
          return {
            mongoUser: 'dtsurkan',
            mongoPass: 'DelM1969',
            mongoCluster: 'cluster0',
          };
        },
      }),
    ],
  }).compile();

  appInstance = moduleFixture.createNestApplication();
  appInstance.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  return appInstance;
}

describe('AppController (e2e)', () => {
  let testService: DmTestService;
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    app = await GetE2eApplication();
    server = app.getHttpServer();
    testService = appInstance.get(DmTestService);
    await testService.initDatabase();
    await app.init();
  });

  it('/ (GET)', async () => {
    return request(server).get('/').expect(200);
  });
});
