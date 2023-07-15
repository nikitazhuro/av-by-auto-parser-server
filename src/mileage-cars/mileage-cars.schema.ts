import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { BrandSchema } from 'src/brand/brand.schema';
import { GenerationSchema } from 'src/generation/generation.schema';
import { ModelSchema } from 'src/model/model.schema';

export interface ICustomIds {
  avby: {
    brandsId: number;
    modelId: number;
    generationId: number;
    carId: number;
  };
}

export interface IMileageCar {
  uuid: string;
  brandUUID: string;
  modelUUID: string;
  generationUUID: string;
  customIds: ICustomIds;
  year: number;
  photos: Array<string>;
  mileage_km: string;
  data: any;
}

@Table({ tableName: 'mileage_cars_new_test' })
export class MileageCarsSchema extends Model<MileageCarsSchema, IMileageCar> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @ForeignKey(() => BrandSchema)
  brandUUID: string;

  @BelongsTo(() => BrandSchema)
  brand: BrandSchema;

  @ForeignKey(() => ModelSchema)
  modelUUID: string;

  @BelongsTo(() => ModelSchema)
  model: ModelSchema;

  @ForeignKey(() => GenerationSchema)
  generationUUID: string;

  @BelongsTo(() => GenerationSchema)
  generation: GenerationSchema;

  @Column({ type: DataType.JSON })
  customIds: ICustomIds;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.JSON })
  photos: Array<string>;

  @Column({ type: DataType.STRING })
  mileage_km: string;

  @Column({ type: DataType.JSON })
  data: any;
}
