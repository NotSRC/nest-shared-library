import { Document, Schema as MongoSchema } from 'mongoose';

export class BaseSchemaModel extends Document {
  _id: MongoSchema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
