import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Photo } from './photo.model';
import { User } from '../../users/model/user.model';

@Table({ tableName: 'user_photo', timestamps: false })
export class UserPhoto extends Model<UserPhoto> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  userId: number;

  @ForeignKey(() => Photo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  photoId: number;
}
