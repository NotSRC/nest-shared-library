import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DmLoggerService extends Logger {
  log(message: any, context?: string): void {
    console.log(message);
    super.log(message, context);
  }
}


