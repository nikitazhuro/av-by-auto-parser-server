import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BrandModel } from 'src/brand/brand.model';
import { ModelSchema } from 'src/model/model.model';

export interface IMileageCar {
  uuid: string;
  brand: string;
  model: string;
  generation: string;
  data: Array<string>;
}

@Table({ tableName: 'mileage-cars' })
export class MileageCarsModel extends Model<MileageCarsModel, IMileageCar> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @Column({ type: DataType.INTEGER })
  brand: number;

  @Column({ type: DataType.INTEGER })
  model: number;

  @Column({ type: DataType.INTEGER })
  generation: number;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.JSON })
  data: Array<string>;
}

export interface ICustomIds {
  avby: {
    brandsId: number;
    modelId: number;
    generationId: number;
    carId: number;
  };
}

export interface IMileageCarNewTest {
  uuid: string;
  brandUUID: string;
  modelUUID: string;
  generation: string;
  customIds: ICustomIds;
  year: number;
  photos: Array<string>;
  mileage_km: string;
  data: any;
}

@Table({ tableName: 'mileage-cars-new-test' })
export class MileageCarsNewTestModel extends Model<
  MileageCarsNewTestModel,
  IMileageCarNewTest
> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @ForeignKey(() => BrandModel)
  brandUUID: string;

  @BelongsTo(() => BrandModel)
  brand: BrandModel;

  @ForeignKey(() => ModelSchema)
  modelUUID: string;

  @BelongsTo(() => ModelSchema)
  model: ModelSchema;

  @Column({ type: DataType.STRING })
  generation: string;

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
