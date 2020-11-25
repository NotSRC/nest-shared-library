import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StaticFileDocument } from './shemas/file.shema';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';

@Injectable()
export class FilesCrudService extends CrudService<StaticFileDocument> {
  constructor(
    @InjectModel('StaticFile')
    protected stateModel: PaginateModel<StaticFileDocument>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }
}
