import { Injectable, Logger } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class DmLoggerService extends Logger {
  constructor(private sentryService: SentryService) {
    super();
  }

  error(exception: Object | string, context?: string): void {
    try {
      this.captureException(exception, context);
      super.error(exception, null, context);
    } catch (err) {}
  }

  warn(exception: Object | string, trace?: string): void {
    try {
      this.captureException(exception);
      super.warn(exception, trace);
    } catch (err) {}
  }

  captureException(exception: Object | string, context?: string) {
    console.error(context, exception);
    let json;
    try {
      json = JSON.stringify({ context: context, exception });
    } catch (e) {
      json = exception;
    }

    try {
      this.sentryService.instance().captureException(json);
    } catch (e) {}
  }
}
