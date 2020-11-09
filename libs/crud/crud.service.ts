import {
  Document,
  DocumentQuery,
  PaginateModel,
  PaginateResult,
  Promise,
  Query,
  QueryPopulateOptions,
} from 'mongoose';
import { FilterService } from '../filter/filter.service';
import { BadRequestException } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';
import { DmLoggerService } from '../logger/src';
import { InternalServerError } from '../exceptions';

export abstract class CrudService<T> {
  constructor(
    protected stateModel: PaginateModel<T & any>,
    protected logger: DmLoggerService,
  ) {}

  findMany(
    conditions: Object,
    params: QueryDto,
    populate: QueryPopulateOptions[] = [],
  ): Promise<PaginateResult<T>> {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return this.stateModel.paginate(query, {
        page: params.page,
        limit: params.limit,
        sort: params.getSort(),
        populate: populate,
      });
    } catch (e) {
      this.logger.error(e, 'CrudService->findMany');
      throw new InternalServerError(e);
    }
  }

  getTotalCount(conditions: Object, params: QueryDto): Query<number> & {} {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return this.stateModel.count(query);
    } catch (e) {
      this.logger.error(e, 'CrudService->getTotalCount');
      throw new InternalServerError(e);
    }
  }

  findOne(conditions: {
    _id?: string;
  }): DocumentQuery<T | null, T & any, {}> & {} {
    try {
      return this.stateModel.findOne(conditions);
    } catch (e) {
      this.logger.error(e, 'CrudService->findOne');
      throw new InternalServerError(e);
    }
  }

  createItem(data): Promise<T> {
    try {
      return this.stateModel.create(data);
    } catch (e) {
      this.logger.error(e, 'CrudService->createItem');
      throw new InternalServerError(e);
    }
  }

  async updateItem(conditions: { _id: string }, data): Promise<T> {
    try {
      if (await this.stateModel.updateOne(conditions, data).exec()) {
        return this.stateModel.findOne(conditions);
      } else {
        return null;
      }
    } catch (e) {
      this.logger.error(e, 'CrudService->updateItem');
      throw new InternalServerError(e);
    }
  }

  deleteItem(conditions: { _id: string }): Query<any> & {} {
    try {
      return this.stateModel.updateOne(conditions, { isRemoved: true });
    } catch (e) {
      this.logger.error(e, 'CrudService->deleteItem');
      throw new InternalServerError(e);
    }
  }

  protected generateFilter(params: Object) {
    return { isRemoved: false, ...params };
  }

  protected buildQuery(conditions: Object, filterJSON: string) {
    const filterParams = this.getAvailableFilters(filterJSON);
    const params = {
      ...conditions,
    };

    if (filterParams?.length) {
      params['$and'] = filterParams;
    }

    return this.generateFilter(params);
  }

  protected getAvailableFilters(filterJSON: string) {
    const filterService = new FilterService(filterJSON);

    const validations = filterService.validateFilters();
    if (validations?.length) {
      throw new BadRequestException({
        statusCode: 400,
        message: ['filter must be a valid FilterInput type'],
        error: 'Bad Request',
        target: validations,
      });
    }

    return filterService.getAvailableFilters();
  }
}
