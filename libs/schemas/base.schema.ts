import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchema extends Document {

  @Prop({
    default: false,
  })
  isRemoved?: boolean;
}
