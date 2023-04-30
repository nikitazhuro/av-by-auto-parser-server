import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { BrandModel } from 'src/brand/brand.model';

export interface ICustomIds {
  avby: number;
}

export interface IModel {
  uuid: string;
  title: string;
  brandUUID: string;
  customIds: ICustomIds;
}

@Table({ tableName: 'models' })
export class ModelSchema extends Model<ModelSchema, IModel> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.JSON })
  customIds: ICustomIds;

  @ForeignKey(() => BrandModel)
  brandUUID: string;

  @BelongsTo(() => BrandModel)
  brand: BrandModel;
}
