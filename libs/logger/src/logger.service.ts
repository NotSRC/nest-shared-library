import { Injectable } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class DmLoggerService extends SentryService {
  captureException(exception: any) {

    let json;
    try {
      json = JSON.stringify(exception);
    } catch (e) {
      json = exception;
    }

    this.instance().captureException(json);
  }
}


