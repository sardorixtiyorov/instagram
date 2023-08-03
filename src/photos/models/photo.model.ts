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
import { UserPhoto } from './user-photo.model';
import { User } from '../../users/model/user.model';
import { Asset } from '../../assets/model/asset.model';
import { Comment } from '../../comment/models/comment.model';

interface photoAttrs {
  id: string;
  title: string;
  link: string;
  users: number[];
}

@Table({ tableName: 'photo' })
export class Photo extends Model<Photo, photoAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(120),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  link: string;

  // user table bilan Many-to-Many relationship qilish uchun
  @BelongsToMany(() => User, () => UserPhoto)
  users: User[];

  @HasMany(() => Asset)
  assets: Asset[];

  @HasMany(() => Comment)
  comments: Comment[];
}
