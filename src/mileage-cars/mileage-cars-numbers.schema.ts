import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { MileageCarsSchema } from './mileage-cars.schema';
import { PhoneNumbersSchema } from 'src/phone-number/phone-numbers.schema';

export interface IUser {
  uuid: string;
  email: string;
  password: string;
}

@Table({
  tableName: 'mileage_cars-numbers',
  createdAt: false,
  updatedAt: false,
})
export class MileageCarsNumbersSchema extends Model<MileageCarsNumbersSchema> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => MileageCarsSchema)
  @Column({ type: DataType.STRING })
  mileageCarUUID: string;

  @ForeignKey(() => PhoneNumbersSchema)
  @Column({ type: DataType.STRING })
  phoneNumberUUID: string;

  @BelongsTo(() => MileageCarsSchema)
  mileageCar: MileageCarsSchema;

  @BelongsTo(() => PhoneNumbersSchema)
  phoneNumber: PhoneNumbersSchema[];
}
