import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './models/comment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentLike } from './models/comment-likes.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment, CommentLike])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
