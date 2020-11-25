import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { DmLoggerService } from './logger.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DmLoggerInterceptor implements NestInterceptor {
  constructor(private logger: DmLoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((exception) => {
        this.logger.captureException(exception);
        throw exception;
      }),
    );
  }
}
