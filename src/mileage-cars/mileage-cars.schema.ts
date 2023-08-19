import { MileageCarsNumbersSchema } from 'src/mileage-cars/mileage-cars-numbers.schema';
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';

import { BrandSchema } from 'src/brand/brand.schema';
import { GenerationSchema } from 'src/generation/generation.schema';
import { ModelSchema } from 'src/model/model.schema';
import { PhoneNumbersSchema } from 'src/phone-number/phone-numbers.schema';
import { VinSchema } from 'src/vin/vin.schema';

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

@Table({ tableName: 'mileage_cars' })
export class MileageCarsSchema extends Model<MileageCarsSchema, IMileageCar> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @ForeignKey(() => BrandSchema)
  brandUUID: string;

  @BelongsTo(() => BrandSchema)
  brand: BrandSchema;

  @ForeignKey(() => ModelSchema)
  modelUUID: string;

  @ForeignKey(() => VinSchema)
  vinUUID: string;

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

  @BelongsToMany(() => PhoneNumbersSchema, () => MileageCarsNumbersSchema)
  phoneNumbers: PhoneNumbersSchema[];

  @BelongsTo(() => VinSchema)
  vin: VinSchema;
}
