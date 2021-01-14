import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { e2eUser } from './dm-testing.constants';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class DmTestingService {
  constructor(@InjectConnection() public connection: Connection) {}

  async dropDatabase() {
    this.connection.db.dropDatabase();
  }

  async initDatabase() {
    await this.dropDatabase();
    await this.setDefaultUser();
  }

  async setDefaultUser() {
    const userCollection = this.connection.db.collection('users');
    await userCollection.insertOne({
      email: e2eUser.email,
      password: e2eUser.passwordHash,
      _id: mongoose.Types.ObjectId(e2eUser._id),
      isRemoved: false,
      language: 'en',
      status: 'active',
      role: 'ROOT',
      firstName: 'e2e',
      lastName: 'test',
    });
  }
}
