import { Schema as MongoSchema } from 'mongoose';

export class BaseSchemaModel {
  _id: MongoSchema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
