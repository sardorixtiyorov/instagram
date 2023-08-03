import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { CommentLike } from './models/comment-likes.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly commentRepo: typeof Comment,
    @InjectModel(CommentLike)
    private readonly commentLikeRepo: typeof CommentLike,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdPhoto = await this.commentRepo.create(createCommentDto);
    return createdPhoto;
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepo.findAll();
  }

  findOne(id: number): Promise<Comment> {
    return this.commentRepo.findByPk(id);
  }

  async likeComment(id: number, userId: number) {
    const findByUserId: CommentLike = await this.commentLikeRepo.findOne({
      where: {
        comment_id: id,
        user_id: userId,
      },
    });

    if (findByUserId) {
      const deletedCount = await this.commentLikeRepo.destroy({
        where: {
          id: findByUserId.id,
        },
      });

      if (deletedCount < 1) {
        throw new HttpException(
          'Error while dislike',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        message: 'disliked successfully',
      };
    }

    await this.commentLikeRepo.create({
      user_id: userId,
      comment_id: id,
    });

    return {
      message: 'liked successfully',
    };
  }

  findByPhotoId(id: number): Promise<Comment[]> {
    return this.commentRepo.findAll({
      where: { photo_id: id },
    });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment | { msg: string }> {
    const [updatedCount, updatedUsers] = await this.commentRepo.update(
      updateCommentDto,
      { where: { id }, returning: true },
    );

    if (updatedCount > 0) return updatedUsers[0];

    return { msg: 'Not found by given id' };
  }

  async remove(id: number): Promise<{ msg: string }> {
    const deletedCount = await this.commentRepo.destroy({
      where: { id },
    });

    if (deletedCount > 0) return { msg: 'deleted successfully' };

    return { msg: 'Not found by given id' };
  }
}
