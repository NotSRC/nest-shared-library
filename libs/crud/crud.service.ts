import { Document, PaginateModel } from 'mongoose';
import { FilterService } from '../filter/filter.service';
import { BadRequestException } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';

export abstract class CrudService<CreateType, UpdateType> {
  constructor(protected stateModel: PaginateModel<Document>) {}

  async findMany(conditions: Object, params: QueryDto) {
    const query = this.buildQuery(conditions, params.filter);
    return await this.stateModel.paginate(query, {
      page: params.page,
      limit: params.perPage,
      sort: params.getSort(),
    });
  }

  async getTotalCount(conditions: Object, params: QueryDto) {
    const query = this.buildQuery(conditions, params.filter);
    return await this.stateModel.count(query);
  }

  async findOne(conditions: { _id: string }) {
    return await this.stateModel.findOne(conditions);
  }

  async createItem(data: CreateType) {
    return await this.stateModel.create(data);
  }

  async updateItem(conditions: { _id: string }, data: UpdateType) {
    return await this.stateModel.updateOne(conditions, data);
  }

  async deleteItem(conditions: { _id: string }) {
    return await this.stateModel.updateOne(conditions, { isRemoved: true });
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
