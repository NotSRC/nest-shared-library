import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';
import { TransformEnumToArray } from '../../../helpers/transform-enum-to-array';
import { Document } from 'mongoose';
import { BaseSchemaModel } from '../../../models/base-schema.model';

export enum UserRole {
  Member = 'MEMBER',
  Sales = 'SALES',
}

export type UserDocument = User & Document;

@Schema()
export class User extends BaseSchemaModel {
  @Prop({
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
    maxlength: 128,
  })
  password: string;

  @Prop({
    maxlength: 128,
    index: true,
    trim: true,
  })
  name: string;

  @Prop({
    default: UserRole.Member,
    enum: TransformEnumToArray(UserRole),
  })
  role: UserRole;

  @Prop({
    default: 'en',
  })
  language: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export const UserProvider = {
  name: 'User',
  useFactory: () => {
    UserSchema.plugin(timestamp);
    UserSchema.plugin(mongoosePaginate);
    return UserSchema;
  },
};
