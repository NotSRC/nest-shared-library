import { Controller, Get, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { DmLoggerInterceptor } from '../libs/logger/src';

@UseInterceptors(DmLoggerInterceptor)
@Controller()
export class AppController {
  @Get('test-error')
  getHello(): string {
    throw new HttpException({ status: 'error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
