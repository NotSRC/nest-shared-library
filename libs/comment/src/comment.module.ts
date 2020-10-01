import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentProvider } from './shemas/comment.schema';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentService],
  imports: [MongooseModule.forFeatureAsync([CommentProvider])],
  exports:[CommentService],
})

export class CommentModule {
}
