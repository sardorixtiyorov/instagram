import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Comment } from './comment.model';
import { User } from '../../users/model/user.model';

@Table({ tableName: 'comment_like' })
export class CommentLike extends Model<CommentLike> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
  })
  comment_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => Comment)
  photo: Comment;
}
