import { Controller, Get, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { DmLoggerInterceptor, DmLoggerService } from '../libs/logger/src';

@UseInterceptors(DmLoggerInterceptor)
@Controller()
export class AppController {
  @Get('test-error')
  getHello(): string {
    this.logger.error({ status: 'error' }, 'AppController');
    throw new HttpException({ status: 'error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  constructor(private logger: DmLoggerService) {

  }
}
