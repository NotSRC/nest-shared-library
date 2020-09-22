import { Document, PaginateModel } from 'mongoose';
import { FilterService } from '../filter/filter.service';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';
import { DmLoggerService } from '../logger/src';

export abstract class CrudService<CreateType, UpdateType> {
  constructor(
    protected stateModel: PaginateModel<Document>,
    protected logger: DmLoggerService,
  ) {}

  async findMany(conditions: Object, params: QueryDto) {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return await this.stateModel.paginate(query, {
        page: params.page,
        limit: params.perPage,
        sort: params.getSort(),
      });
    } catch (e) {
      this.logger.error(e, 'CrudService->findMany');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTotalCount(conditions: Object, params: QueryDto) {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return await this.stateModel.count(query);
    } catch (e) {
      this.logger.error(e, 'CrudService->getTotalCount');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(conditions: { _id: string }) {
    try {
      return await this.stateModel.findOne(conditions);
    } catch (e) {
      this.logger.error(e, 'CrudService->findOne');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createItem(data: CreateType) {
    try {
      return await this.stateModel.create(data);
    } catch (e) {
      this.logger.error(e, 'CrudService->createItem');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateItem(conditions: { _id: string }, data: UpdateType) {
    try {
      return await this.stateModel.updateOne(conditions, data);
    } catch (e) {
      this.logger.error(e, 'CrudService->updateItem');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteItem(conditions: { _id: string }) {
    try {
      return await this.stateModel.updateOne(conditions, { isRemoved: true });
    } catch (e) {
      this.logger.error(e, 'CrudService->deleteItem');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected buildQuery(conditions: Object, filterJSON: string) {
    const filterService = new FilterService(filterJSON);

    if (filterService.validateFilters().length) {
      throw new BadRequestException({
        statusCode: 400,
        message: ['filter must be a Array of FilterItem type'],
        error: 'Bad Request',
      });
    }

    const availableFilters = filterService.getAvailableFilters();
    return this.generateFilter({
      ...conditions,
      ...availableFilters,
    });
  }

  protected generateFilter(params: Object) {
    return { isRemoved: false, ...params };
  }
}

