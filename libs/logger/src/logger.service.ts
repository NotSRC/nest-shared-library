import { Injectable } from '@nestjs/common';
import { SentryInterceptor } from '@ntegral/nestjs-sentry/dist/services/sentry.interceptor';

@Injectable()
export class DmLoggerInterceptor extends SentryInterceptor {

}


