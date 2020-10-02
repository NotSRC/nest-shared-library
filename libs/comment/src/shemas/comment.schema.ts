import { Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as timestamp from 'mongoose-timestamp';
import * as mongoosePaginate from 'mongoose-paginate';
import { BaseSchema } from '../../../schemas/base.schema';

@Schema()
export class Comment extends BaseSchema {

  @Prop({
    required: true,
  })
  body: string;

  @Prop()
  attachments: string[];

  @Prop({
    ref: 'User',
  })
  createdBy: MongoSchema.Types.ObjectId;

  @Prop()
  ticket: MongoSchema.Types.ObjectId;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

export const CommentProvider = {
  name: 'Comment',
  useFactory: () => {
    CommentSchema.plugin(timestamp);
    CommentSchema.plugin(mongoosePaginate);
    return CommentSchema;
  },
};
