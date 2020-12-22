import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { TransformEnumToArray } from '../../../helpers/transform-enum-to-array';
import { Connection, Schema as MongoSchema, Document } from 'mongoose';
import { BaseSchemaModel } from '../../../models/base-schema.model';
import { ApiProperty } from '@nestjs/swagger';

export enum UserTeam {
  Electrical = 'electrical',
  Plumbing = 'plumbing',
  Hvac = 'hvac',
  General = 'general',
  Landscaping = 'landscaping',
  Networking = 'networking',
}

export enum UserRole {
  Root = 'ROOT',
  Facility = 'FACILITY',
  Worker = 'WORKER',
  Tenant = 'TENANT',
  Member = 'MEMBER',
  Sales = 'SALES',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Invited = 'invited',
}

@Schema()
export class User extends BaseSchemaModel {
  @ApiProperty()
  @Prop({
    default: 1,
    index: true,
  })
  userId: number;

  @ApiProperty()
  @Prop({
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @ApiProperty({ type: [String] })
  @Prop([
    {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      trim: true,
      lowercase: true,
    },
  ])
  additionalEmails: string[];

  @ApiProperty()
  @Prop({
    trim: true,
    lowercase: true,
  })
  phone: string;

  @ApiProperty({ type: [String] })
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

  @ApiProperty()
  @Prop({
    maxlength: 128,
    index: true,
    trim: true,
  })
  username: string;

  @ApiProperty()
  @Prop({
    maxlength: 64,
    trim: true,
  })
  firstName: string;

  @ApiProperty()
  @Prop({
    maxlength: 64,
    trim: true,
  })
  lastName: string;

  @ApiProperty({
    enum: TransformEnumToArray(UserRole),
  })
  @Prop({
    default: UserRole.Member,
    enum: TransformEnumToArray(UserRole),
  })
  role: UserRole;

  @ApiProperty({
    enum: TransformEnumToArray(UserStatus),
  })
  @Prop({
    default: UserStatus.Inactive,
    enum: TransformEnumToArray(UserStatus),
  })
  status: UserStatus;

  @ApiProperty({
    enum: TransformEnumToArray(UserTeam),
  })
  @Prop([
    {
      type: String,
      enum: TransformEnumToArray(UserTeam),
    },
  ])
  team: UserTeam[];

  @ApiProperty()
  @Prop({
    default: 'en',
  })
  language: string;

  @ApiProperty()
  @Prop()
  location: string;

  @ApiProperty()
  @Prop({
    ref: 'User',
    type: MongoSchema.Types.ObjectId,
  })
  createdBy: MongoSchema.Types.ObjectId;

  permissions: string[];
}

export type UserDocument = User & Document;
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
