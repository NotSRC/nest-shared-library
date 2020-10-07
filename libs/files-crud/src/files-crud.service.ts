import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileModel } from './shemas/file.shema';
import { CreateFile } from './@types/create-file';
import { UpdateFile } from './@types/update-file';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';

@Injectable()
export class FilesCrudService extends CrudService<CreateFile, UpdateFile> {
  constructor(
    @InjectModel('File')
    protected stateModel: PaginateModel<FileModel>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }
}
