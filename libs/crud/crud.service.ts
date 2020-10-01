import { Document, PaginateModel, QueryPopulateOptions } from 'mongoose';
import { FilterService } from '../filter/filter.service';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';
import { DmLoggerService } from '../logger/src';

export abstract class CrudService<CreateType, UpdateType> {
  constructor(
    protected stateModel: PaginateModel<Document>,
    protected logger: DmLoggerService,
  ) {}

  findMany(conditions: Object, params: QueryDto, populate: QueryPopulateOptions[] = []) {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return this.stateModel.paginate(query, {
        page: params.page,
        limit: params.limit,
        sort: params.getSort(),
        populate: populate
      });
    } catch (e) {
      this.logger.error(e, 'CrudService->findMany');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getTotalCount(conditions: Object, params: QueryDto) {
    const query = this.buildQuery(conditions, params.filter);
    try {
      return this.stateModel.count(query);
    } catch (e) {
      this.logger.error(e, 'CrudService->getTotalCount');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(conditions: { _id: string }) {
    try {
      return this.stateModel.findOne(conditions);
    } catch (e) {
      this.logger.error(e, 'CrudService->findOne');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  createItem(data: CreateType) {
    try {
      return this.stateModel.create(data);
    } catch (e) {
      this.logger.error(e, 'CrudService->createItem');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  updateItem(conditions: { _id: string }, data: UpdateType) {
    try {
      return this.stateModel.updateOne(conditions, data);
    } catch (e) {
      this.logger.error(e, 'CrudService->updateItem');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteItem(conditions: { _id: string }) {
    try {
      return this.stateModel.updateOne(conditions, { isRemoved: true });
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

