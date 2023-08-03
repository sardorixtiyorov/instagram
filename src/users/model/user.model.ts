import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Photo } from '../../photos/models/photo.model';
import { UserPhoto } from '../../photos/models/user-photo.model';
import { Role } from '../../roles/models/role.model';
import { UserRoles } from '../../roles/models/user-role.model';

interface userAttrs {
  id: string;
  name: string;
  description: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, userAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @ApiProperty({
    title: 'name',
    example: 'test_1',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  // photo modeli Many to Many relationship qilish uchun
  @BelongsToMany(() => Photo, () => UserPhoto)
  photos: Photo[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
