import { Injectable } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class DmLoggerService extends SentryService {

  app: string = 'dm-logger-module: ';

  captureException(exception: any) {

    let json;
    try {
      json = JSON.stringify(exception);
    } catch (e) {
      json = exception;
    }

    try {
      this.instance().captureException(json);
    } catch (e) {
      
    }
  }
}


