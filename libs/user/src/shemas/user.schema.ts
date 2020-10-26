import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { TransformEnumToArray } from '../../../helpers/transform-enum-to-array';
import { Connection, Document } from 'mongoose';
import { BaseSchemaModel } from '../../../models/base-schema.model';

export enum UserTeam {
  FacilityManager = 'facility-manager',
  Plumber = 'plumber',
  Electrical = 'electrical',
}

export enum UserRole {
  Facility = 'FACILITY',
  Worker = 'WORKER',
  Tenant = 'TENANT',
  Member = 'MEMBER',
  Sales = 'SALES',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export type UserDocument = User & Document;

@Schema()
export class User extends BaseSchemaModel {
  @Prop({
    default: 1,
    index: true,
  })
  userId: number;

  @Prop({
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop([
    {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      trim: true,
      lowercase: true,
    },
  ])
  additionalEmails: string[];

  @Prop({
    trim: true,
    lowercase: true,
  })
  phone: string;

  @Prop([
    {
      type: String,
      trim: true,
      lowercase: true,
    },
  ])
  additionalPhones: string[];

  @Prop({
    minlength: 6,
    maxlength: 128,
  })
  password: string;

  @Prop({
    maxlength: 128,
    index: true,
    trim: true,
  })
  username: string;

  @Prop({
    maxlength: 64,
    trim: true,
  })
  firstName: string;

  @Prop({
    maxlength: 64,
    trim: true,
  })
  lastName: string;

  @Prop({
    default: UserRole.Member,
    enum: TransformEnumToArray(UserRole),
  })
  role: UserRole;

  @Prop({
    default: UserStatus.Inactive,
    enum: TransformEnumToArray(UserStatus),
  })
  status: UserStatus;

  @Prop([
    {
      enum: TransformEnumToArray(UserTeam),
    },
  ])
  team: UserTeam[];

  @Prop({
    default: 'en',
  })
  language: string;

  @Prop()
  location: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export const UserProvider = {
  name: 'User',
  inject: ['DatabaseConnection'],
  useFactory: (connection: Connection) => {
    const AutoIncrement = AutoIncrementFactory(connection);
    UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });
    UserSchema.plugin(timestamp);
    UserSchema.plugin(mongoosePaginate);
    return UserSchema;
  },
};
