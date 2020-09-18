import { Injectable } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class DmLoggerService extends SentryService {

}


