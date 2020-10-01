import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserProvider } from './shemas/user.schema';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [MongooseModule.forFeatureAsync([UserProvider])],
  exports: [UserService],
})
export class UserModule {}
