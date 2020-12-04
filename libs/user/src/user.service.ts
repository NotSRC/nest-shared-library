import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, QueryPopulateOptions } from 'mongoose';
import { User, UserDocument } from './shemas/user.schema';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';
import { QueryDto } from '../..';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectModel('User')
    protected stateModel: PaginateModel<UserDocument>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }

  async findMany(
    conditions: FilterQuery<User>,
    params: QueryDto,
    populate: QueryPopulateOptions[] = [],
    select = `-password`,
  ) {
    return super.findMany(conditions, params, populate, select);
  }

  findOneByEmail(conditions: FilterQuery<User>) {
    return super.findOne(conditions).exec();
  }
}
