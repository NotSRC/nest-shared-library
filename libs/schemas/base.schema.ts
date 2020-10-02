import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class BaseSchema extends Document {

  @Prop({
    default: false,
  })
  isRemoved?: boolean;
}
