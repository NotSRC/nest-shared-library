import {
  DocumentQuery,
  FilterQuery,
  PaginateModel,
  PaginateResult,
  Promise,
  Query,
  Document,
  QueryPopulateOptions,
  CreateQuery,
  UpdateQuery,
} from 'mongoose';
import { FilterService } from '../filter/filter.service';
import { BadRequestException } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';
import { DmLoggerService } from '../logger/src';
import { BaseSchemaModel } from '../models/base-schema.model';

export abstract class CrudService<T extends BaseSchemaModel> {
  constructor(
    protected stateModel: PaginateModel<T & any>,
    protected logger: DmLoggerService,
  ) {}

  findMany(
    conditions: FilterQuery<T>,
    params: QueryDto,
    populate: QueryPopulateOptions[] = [],
    selectKeys?: string,
  ): Promise<PaginateResult<T>> {
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

  getTotalCount(conditions: FilterQuery<T>, params: QueryDto): Query<number> {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return this.stateModel.count(query);
    } catch (e) {
      this.logger.error(e, 'CrudService->getTotalCount');
      throw e;
    }
  }

  findOne(
    conditions: FilterQuery<T>,
  ): DocumentQuery<T | null, T & Document, {}> & {} {
    try {
      return this.stateModel.findOne(conditions);
    } catch (e) {
      this.logger.error(e, 'CrudService->findOne');
      throw e;
    }
  }

  createItem(data: Partial<CreateQuery<T>>): Promise<T> {
    try {
      return this.stateModel.create(data as CreateQuery<T>);
    } catch (e) {
      this.logger.error(e, 'CrudService->createItem');
      throw e;
    }
  }

  async updateItem(conditions: FilterQuery<T>, data: Partial<UpdateQuery<T>>) {
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

  async deleteItem(conditions: FilterQuery<T>) {
    try {
      // @ts-ignore
      return this.updateItem(conditions, { isRemoved: true });
    } catch (e) {
      this.logger.error(e, 'CrudService->deleteItem');
      throw e;
    }
  }

  protected generateFilter(params: FilterQuery<T>) {
    return { isRemoved: false, ...params };
  }

  protected buildQuery(conditions: FilterQuery<T>, filterJSON: string) {
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
