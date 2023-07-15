import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { BrandSchema } from 'src/brand/brand.schema';
import { GenerationSchema } from 'src/generation/generation.schema';

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

  @ForeignKey(() => BrandSchema)
  brandUUID: string;

  @BelongsTo(() => BrandSchema)
  brand: BrandSchema;

  @HasMany(() => GenerationSchema)
  generations: GenerationSchema[];
}
