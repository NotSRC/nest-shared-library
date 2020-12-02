import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, QueryPopulateOptions } from 'mongoose';
import { User } from './shemas/user.schema';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';
import { QueryDto } from '../..';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectModel('User')
    protected stateModel: PaginateModel<User>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }

  findMany(
    conditions: Object,
    params: QueryDto,
    populate: QueryPopulateOptions[] = [],
    select: string = `-password`,
  ) {
    const query = this.buildQuery(conditions, params.filter);
    delete query.isRemoved;
    try {
      return this.stateModel.paginate(query, {
        page: params.page,
        limit: params.limit,
        sort: params.getSort(),
        populate: populate,
        select: select,
      });
    } catch (e) {
      this.logger.error(e, 'CrudService->findMany');
      throw e;
    }
  }

  findOneByEmail(conditions: { email: string; _id?: string }) {
    return super.findOne(conditions).exec();
  }
}
