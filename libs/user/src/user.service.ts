import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { User } from './shemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CrudService } from '../../crud/crud.service';
import { DmLoggerService } from '../../logger/src/logger.service';

@Injectable()
export class UserService extends CrudService<CreateUserDto, any> {

  constructor(
    @InjectModel('User')
    protected stateModel: PaginateModel<User>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }

  findOne(conditions: { email: string, _id?: string }) {
    return super.findOne(conditions as any);
  }
}
