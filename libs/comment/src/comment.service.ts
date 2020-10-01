import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Comment } from './shemas/comment.schema';
import { CrudService, DmLoggerService } from '../..';

@Injectable()
export class CommentService<T, D> extends CrudService<T, D> {
  constructor(
    @InjectModel('Comment')
    protected stateModel: PaginateModel<Comment>,
    protected logger: DmLoggerService,
  ) {
    super(stateModel, logger);
  }
}
