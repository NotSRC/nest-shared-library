import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';
import { BaseSchemaModel } from '../../../models/base-schema.model';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class StaticFileModel extends BaseSchemaModel {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  size: number;

  @ApiProperty()
  @Prop()
  url: string;

  @ApiProperty()
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
