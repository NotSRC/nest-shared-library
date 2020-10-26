import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';
import { BaseSchemaModel } from '../../../models/base-schema.model';

export type FileDocument = FileModel & Document;

@Schema()
export class FileModel extends BaseSchemaModel {
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
  isRemoved?: boolean;
}

const FileSchema = SchemaFactory.createForClass(FileModel);

export const FileProvider = {
  name: 'File',
  useFactory: () => {
    FileSchema.plugin(timestamp);
    FileSchema.plugin(mongoosePaginate);
    return FileSchema;
  },
};
