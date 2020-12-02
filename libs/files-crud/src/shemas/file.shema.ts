import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';

@Schema()
export class StaticFileModel extends Document {
  @Prop()
  name: string;

  @Prop()
  size: number;

  @Prop()
  url: string;

  @Prop()
  mimetype: string;

  @Prop({
    default: false,
  })
  isRemoved: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const StaticFileSchema = SchemaFactory.createForClass(StaticFileModel);

export const FileProvider = {
  name: 'StaticFile',
  useFactory: (): any => {
    StaticFileSchema.plugin(timestamp);
    StaticFileSchema.plugin(mongoosePaginate);
    return StaticFileSchema;
  },
};
