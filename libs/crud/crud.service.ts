import { PaginateModel, QueryPopulateOptions } from 'mongoose';
import { FilterService } from '../filter/filter.service';
import { BadRequestException } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';
import { DmLoggerService } from '../logger/src';

export abstract class CrudService<T> {
  constructor(
    protected stateModel: PaginateModel<T & any>,
    protected logger: DmLoggerService,
  ) {}

  findMany(
    conditions: Object,
    params: QueryDto,
    populate: QueryPopulateOptions[] = [],
    selectKeys?: string,
  ) {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return this.stateModel.paginate(query, {
        page: params.page,
        limit: params.limit,
        sort: params.getSort(),
        populate: populate,
        select: selectKeys,
      });
    } catch (e) {
      this.logger.error(e, 'CrudService->findMany');
      throw e;
    }
  }

  getTotalCount(conditions: Object, params: QueryDto) {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return this.stateModel.count(query);
    } catch (e) {
      this.logger.error(e, 'CrudService->getTotalCount');
      throw e;
    }
  }

  findOne(conditions: { _id?: string }) {
    try {
      return this.stateModel.findOne(conditions);
    } catch (e) {
      this.logger.error(e, 'CrudService->findOne');
      throw e;
    }
  }

  createItem(data) {
    try {
      return this.stateModel.create(data);
    } catch (e) {
      this.logger.error(e, 'CrudService->createItem');
      throw e;
    }
  }

  async updateItem(conditions: { _id: string }, data) {
    try {
      if (await this.stateModel.updateOne(conditions, data).exec()) {
        return this.stateModel.findOne(conditions);
      } else {
        return null;
      }
    } catch (e) {
      this.logger.error(e, 'CrudService->updateItem');
      throw e;
    }
  }

  deleteItem(conditions: { _id: string }) {
    try {
      return this.stateModel.updateOne(conditions, { isRemoved: true });
    } catch (e) {
      this.logger.error(e, 'CrudService->deleteItem');
      throw e;
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
