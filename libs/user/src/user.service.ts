import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './@types/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    try {
      return this.userModel.findOne({ email });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createUserDto: {  email: string, password: string  }): Promise<User | undefined> {
    try {
      return this.userModel.create<{  email: string, password: string  }>(createUserDto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
