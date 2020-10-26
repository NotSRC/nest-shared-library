import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, QueryPopulateOptions } from 'mongoose';
import { User, UserDocument } from './shemas/user.schema';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';
import { InternalServerError, QueryDto } from '../..';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectModel('User')
    protected stateModel: PaginateModel<UserDocument>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }

  findMany(
    conditions: Object,
    params: QueryDto,
    populate: QueryPopulateOptions[] = [],
  ) {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return this.stateModel.paginate(query, {
        page: params.page,
        limit: params.limit,
        sort: params.getSort(),
        populate: populate,
        select: '-password',
      });
    } catch (e) {
      this.logger.error(e, 'CrudService->findMany');
      throw new InternalServerError(e);
    }
  }

  findOneByEmail(conditions: { email: string; _id?: string }) {
    return super.findOne(conditions).exec();
  }
}
