import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DmLoggerInterceptor, DmLoggerService } from '../libs/logger/src';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesCrudService, User } from '../libs';
import { ApiCreatedResponse } from '@nestjs/swagger';

@UseInterceptors(DmLoggerInterceptor)
@Controller()
export class AppController {
  @Get('test-error')
  getHello(): string {
    this.logger.error({ status: 'error' }, 'AppController');
    throw new HttpException(
      { status: 'error' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return await this.filesCrudService.createItem({
      name: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    });
  }

  @ApiCreatedResponse({
    description: 'Method create user and return authorization token',
    type: User,
  })
  @Post('user')
  @UseInterceptors(FileInterceptor('file'))
  async users(@UploadedFile() file) {
    return [];
  }

  constructor(
    private logger: DmLoggerService,
    private filesCrudService: FilesCrudService,
  ) {}
}
