import { Module } from '@nestjs/common';
import { MongooseModule, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserProvider } from './shemas/user.schema';
import { UserService } from './user.service';

@Schema()
export class Location {}

const LocationSchema = SchemaFactory.createForClass(Location);

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }]),
    MongooseModule.forFeatureAsync([UserProvider]),
  ],
  exports: [UserService],
})
export class UserModule {}
