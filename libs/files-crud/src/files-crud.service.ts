import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StaticFileModel } from './shemas/file.shema';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';

@Injectable()
export class FilesCrudService extends CrudService {
  constructor(
    @InjectModel('StaticFile')
    protected stateModel: PaginateModel<StaticFileModel>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }
}
