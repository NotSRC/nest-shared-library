import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';
import { BaseSchemaModel } from '../../../models/base-schema.model';

@Schema()
export class StaticFileModel extends BaseSchemaModel {
  @Prop()
  name: string;

  @Prop()
  size: number;

  @Prop()
  url: string;

  @Prop()
  mimetype: string;
}

export type StaticFileDocument = StaticFileModel & Document;
const StaticFileSchema = SchemaFactory.createForClass(StaticFileModel);

export const FileProvider = {
  name: 'StaticFile',
  useFactory: () => {
    StaticFileSchema.plugin(timestamp);
    StaticFileSchema.plugin(mongoosePaginate);
    return StaticFileSchema;
  },
};
