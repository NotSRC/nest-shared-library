import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { DmLoggerInterceptor } from '../libs/logger/src';

@UseInterceptors(DmLoggerInterceptor)
@Controller()
export class AppController {
  @Get()
  getHello() {
    return true;
  }
}
