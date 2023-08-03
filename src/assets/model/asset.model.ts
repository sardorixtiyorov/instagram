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

interface assetAttrs {
  id: string;
  photo_id: number;
  url: string;
  extension: string;
}

@Table({ tableName: 'asset' })
export class Asset extends Model<Asset, assetAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(120),
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING(120),
    allowNull: false,
  })
  extension: string;

  @ForeignKey(() => Photo)
  @Column({
    type: DataType.INTEGER,
  })
  photo_id: number;
}
