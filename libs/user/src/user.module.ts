import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';

import { UserProvider } from './shemas/user.schema';
import { UserService } from './user.service';

@Schema()
export class Location {}

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeatureAsync([
      UserProvider,
      {
        name: 'Location',
        useFactory: () => Location,
      },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
