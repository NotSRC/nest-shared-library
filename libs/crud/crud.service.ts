import { Document, PaginateModel, QueryPopulateOptions } from 'mongoose';
import { FilterService } from '../filter/filter.service';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';
import { DmLoggerService } from '../logger/src';

export abstract class CrudService {
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

  findOne(conditions: { _id?: string }) {
    try {
      return this.stateModel.findOne(conditions);
    } catch (e) {
      this.logger.error(e, 'CrudService->findOne');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  createItem(data) {
    try {
      return this.stateModel.create(data);
    } catch (e) {
      this.logger.error(e, 'CrudService->createItem');
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  updateItem(conditions: { _id: string }, data) {
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

  protected generateFilter(params: Object) {
    return { isRemoved: false, ...params };
  }

  protected buildQuery(conditions: Object, filterJSON: string) {
    const filterService = new FilterService(filterJSON);

    const validations = filterService.validateFilters();
    if (validations?.length) {
      throw new BadRequestException({
        statusCode: 400,
        message: ['filter must be a valid FilterInput type'],
        error: 'Bad Request',
        target: validations
      });
    }

    const filterParams = filterService.getAvailableFilters();
    const params = {
      ...conditions
    }

    if (filterParams?.length) {
      params['$and'] = filterParams;
    }

    return this.generateFilter(params);
  }
}

