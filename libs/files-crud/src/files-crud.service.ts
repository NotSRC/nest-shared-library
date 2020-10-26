import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument, FileModel } from './shemas/file.shema';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';

@Injectable()
export class FilesCrudService extends CrudService<FileModel> {
  constructor(
    @InjectModel('File')
    protected stateModel: PaginateModel<FileDocument>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }
}
