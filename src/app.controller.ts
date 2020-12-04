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
import { FilesCrudService } from '../libs';

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

  constructor(
    private logger: DmLoggerService,
    private filesCrudService: FilesCrudService,
  ) {}
}
