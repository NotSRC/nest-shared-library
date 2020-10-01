import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';
import { Document } from 'mongoose';

export enum UserRole {
  Member = 'MEMBER',
  Sales = 'SALES',
}

@Schema()
export class User extends Document {

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
    enum: UserRole,
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
