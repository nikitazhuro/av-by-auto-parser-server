import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { BrandSchema } from 'src/brand/brand.schema';
import { ModelSchema } from 'src/model/model.schema';

export interface ICustomIds {
  avby: number;
}

export interface IGeneration {
  uuid: string;
  title: string;
  brandUUID: string;
  modelUUID: string;
  yearFrom: number | null;
  yearTo: number | null;
  data: any;
  customIds: ICustomIds;
}

@Table({ tableName: 'generations' })
export class GenerationSchema extends Model<GenerationSchema, IGeneration> {
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

  @ForeignKey(() => ModelSchema)
  modelUUID: string;

  @BelongsTo(() => ModelSchema)
  model: ModelSchema;

  @Column({ type: DataType.INTEGER })
  yearFrom: number | null;

  @Column({ type: DataType.INTEGER })
  yearTo: number | null;

  @Column({ type: DataType.JSON })
  data: any;
}
