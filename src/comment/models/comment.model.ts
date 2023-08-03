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
import { Photo } from '../../photos/models/photo.model';
import { User } from '../../users/model/user.model';

interface photoAttrs {
  id: string;
  title: string;
  link: string;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, photoAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text: string;

  @ForeignKey(() => Photo)
  @Column({
    type: DataType.INTEGER,
  })
  photo_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => Photo)
  photo: Photo;
}
