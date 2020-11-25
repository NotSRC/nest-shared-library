import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { DmLoggerService } from './logger.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DmLoggerInterceptor implements NestInterceptor {
  constructor(private logger: DmLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): any {
    return next.handle().pipe(
      catchError((exception) => {
        this.logger.captureException(exception);
        throw exception;
      }),
    );
  }
}
