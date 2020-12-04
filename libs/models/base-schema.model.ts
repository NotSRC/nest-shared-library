import { Schema as MongoSchema } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchemaModel {
  _id: MongoSchema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ default: false })
  isRemoved: boolean;
}
