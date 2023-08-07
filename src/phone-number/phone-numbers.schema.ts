import {
  Table,
  Column,
  DataType,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { MileageCarsNumbersSchema } from 'src/mileage-cars/mileage-cars-numbers.schema';
import { MileageCarsSchema } from 'src/mileage-cars/mileage-cars.schema';

export interface ICustomIds {
  avby: number;
}

export interface IPhoneNumbers {
  uuid: string;
  number: string;
  customIds: ICustomIds;
  country: ICountry;
}

export interface ICountry {
  id: number;
  label: string;
  emoji: string;
  code: string;
}

@Table({ tableName: 'phone_numbers' })
export class PhoneNumbersSchema extends Model<
  PhoneNumbersSchema,
  IPhoneNumbers
> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @Column({ type: DataType.STRING })
  number: string;

  @Column({ type: DataType.ABSTRACT })
  avCarsIds: Array<number>;

  @BelongsToMany(() => MileageCarsSchema, () => MileageCarsNumbersSchema)
  mileageCars: MileageCarsSchema[];
}
