import {
  CreateQuery,
  Document,
  DocumentQuery,
  FilterQuery,
  MongooseDocument,
  PaginateModel,
  PaginateResult,
  Promise,
  Query,
  QueryPopulateOptions,
  UpdateQuery,
} from 'mongoose';
import { FilterService } from '../filter/filter.service';
import { BadRequestException } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';
import { DmLoggerService } from '../logger/src';
import { BaseSchemaModel } from '../models/base-schema.model';

export abstract class CrudService<BaseModel extends BaseSchemaModel> {
  constructor(
    protected stateModel: PaginateModel<BaseModel & Document>,
    protected logger: DmLoggerService,
  ) {}

  /**
   * Find many items with pagination and default filters
   * @param conditions
   * @param params
   * @param populate
   * @param selectKeys
   */
  findMany(
    conditions: FilterQuery<BaseModel>,
    params: QueryDto,
    populate: QueryPopulateOptions[] = [],
    selectKeys?: string,
  ): Promise<PaginateResult<BaseModel & MongooseDocument>> {
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

  /**
   * Get total count of items with default filters
   * @param conditions
   * @param params
   */
  getTotalCount(
    conditions: FilterQuery<BaseModel>,
    params: QueryDto,
  ): Query<number> {
    const query: FilterQuery<BaseModel> = this.buildQuery(
      conditions,
      params.filter,
    );
    try {
      return this.stateModel.countDocuments(query as any);
    } catch (e) {
      this.logger.error(e, 'CrudService->getTotalCount');
      throw e;
    }
  }

  /**
   * Get one item
   * @param conditions
   */
  findOne(
    conditions: FilterQuery<BaseModel>,
  ): DocumentQuery<BaseModel, BaseModel & Document, {}> {
    try {
      return this.stateModel.findOne(conditions as any);
    } catch (e) {
      this.logger.error(e, 'CrudService->findOne');
      throw e;
    }
  }

  /**
   * Create item
   * @param data
   */
  async createItem(
    data: Partial<CreateQuery<BaseModel>>,
  ): Promise<BaseModel & Document> {
    try {
      return await this.stateModel.create(data as CreateQuery<BaseModel>);
    } catch (e) {
      this.logger.error(e, 'CrudService->createItem');
      throw e;
    }
  }

  /**
   * Update item
   * @param conditions
   * @param data
   */
  async updateItem(
    conditions: FilterQuery<BaseModel>,
    data: Partial<UpdateQuery<BaseModel>>,
  ) {
    try {
      if (
        (
          await this.stateModel.updateOne(conditions as any, data as any).exec()
        )?.toJSON()
      ) {
        return await this.stateModel.findOne(conditions as any);
      } else {
        return null;
      }
    } catch (e) {
      this.logger.error(e, 'CrudService->updateItem');
      throw e;
    }
  }

  /**
   * Soft delete item
   * Method update isRemoved field to true
   * @param conditions
   */
  softDeleteItem(conditions: FilterQuery<BaseModel>) {
    try {
      // @ts-ignore
      return this.updateItem(conditions, { isRemoved: true });
    } catch (e) {
      this.logger.error(e, 'CrudService->softDeleteItem');
      throw e;
    }
  }

  /**
   * Hard delete item
   * @param conditions
   */
  hardDeleteItem(conditions: FilterQuery<BaseModel>) {
    try {
      // @ts-ignore
      return this.stateModel.deleteOne(conditions);
    } catch (e) {
      this.logger.error(e, 'CrudService->hardDeleteItem');
      throw e;
    }
  }

  /**
   * Generate filter with defaults
   * @param params
   * @protected
   */
  protected generateFilter(
    params: FilterQuery<BaseModel>,
  ): FilterQuery<BaseModel> {
    return { isRemoved: false, ...params };
  }

  /**
   * Build query with filters and defaults
   * @param conditions
   * @param filterJSON
   * @protected
   */
  protected buildQuery(
    conditions: FilterQuery<BaseModel>,
    filterJSON: string,
  ): FilterQuery<BaseModel> {
    const filterParams = this.getAvailableFilters(filterJSON);
    const params = {
      ...conditions,
    };

    if (filterParams?.length) {
      params['$and'] = filterParams;
    }

    return this.generateFilter(params);
  }

  /**
   * Validate filters
   * @param filterJSON
   * @protected
   */
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
