import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchemaModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ default: false })
  isRemoved: boolean;
}
