import { QueryPopulateOptions } from 'mongoose';
import { QueryDto } from '../dto/query.dto';
import { DmLoggerService } from '../logger/src';
import { CrudService } from '../crud/crud.service';
import { NotFoundException } from '@nestjs/common';

export abstract class ApiService {
  constructor(
    protected crudService: CrudService,
    protected logger: DmLoggerService,
  ) {
  }

  async findMany(conditions: Object, params: QueryDto, populate: QueryPopulateOptions[] = []) {
    return await this.crudService.findMany(conditions, params, populate);
  }

  async getTotalCount(conditions: Object, params: QueryDto) {
    return await this.crudService.getTotalCount(conditions, params);
  }

  async findOne(conditions: { _id?: string }) {
    const item = await this.crudService.findOne(conditions);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async createItem(data) {
    return await this.crudService.createItem(data);
  }

  async updateItem(conditions: { _id: string }, data) {
    return await this.crudService.updateItem(conditions, data);
  }

  async deleteItem(conditions: { _id: string }) {
    return await this.crudService.deleteItem(conditions);
  }
}

