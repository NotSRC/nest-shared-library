import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Mongoose } from 'mongoose';
import { DmTestModuleOptions } from './dm-testing.module';
import { e2eUser } from './dm-testing.constants';

@Injectable()
export class DmTestingService {
  mongoose: Mongoose;

  constructor(
    @Inject('DmTestModuleOptions') private options: DmTestModuleOptions,
  ) {}

  async connectToDatabase() {
    const user = this.options.mongoUser;
    const password = this.options.mongoPass;
    const cluster = this.options.mongoCluster;
    this.mongoose = await mongoose.connect(
      `mongodb+srv://${user}:${password}@${cluster}.x40fy.mongodb.net/test`,
    );
  }

  async disconnectFromDb() {
    this.mongoose.disconnect();
  }

  async dropDatabase() {
    mongoose.connection.db.dropDatabase();
  }

  async initDatabase() {
    await this.connectToDatabase();
    await this.dropDatabase();
    await this.setDefaultUser();
    await this.disconnectFromDb();
  }

  async setDefaultUser() {
    const userCollection = mongoose.connection.db.collection('user');
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
