import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { User } from './shemas/user.schema';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';

@Injectable()
export class UserService extends CrudService {
  constructor(
    @InjectModel('User')
    protected stateModel: PaginateModel<User>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }

  findOneByEmail(conditions: { email: string; _id?: string }) {
    return super.findOne(conditions);
  }
}
