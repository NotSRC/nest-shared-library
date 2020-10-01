import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { User } from './shemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CrudService, DmLoggerService } from '../..';

@Injectable()
export class UserService extends CrudService<CreateUserDto, any> {

  constructor(
    @InjectModel('User')
    protected stateModel: PaginateModel<User>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }

  // @ts-ignore
  findOne(conditions: { email: string }) {
    return super.findOne(conditions as any);
  }
}
