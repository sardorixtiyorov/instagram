import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/model/user.model';

interface userAttrs {
  id: string;
  user_id: number;
  subscribed_user_id: number;
}

@Table({ tableName: 'followers' })
export class Follower extends Model<Follower, userAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  subscribed_user_id: number;

  @BelongsTo(() => User, 'subscribed_user_id')
  user: User;
}
