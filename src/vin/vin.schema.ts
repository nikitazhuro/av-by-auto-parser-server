import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';

import { MileageCarsSchema } from 'src/mileage-cars/mileage-cars.schema';

export interface IVin {
  uuid: string;
  vin: string;
  avCarsIds: Array<number>;
  mileageCars: MileageCarsSchema[];
}

@Table({ tableName: 'vins' })
export class VinSchema extends Model<VinSchema, IVin> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @Column({ type: DataType.STRING, unique: true })
  vin: string;

  @Column({ type: DataType.ABSTRACT })
  avCarsIds: Array<number>;

  @HasMany(() => MileageCarsSchema)
  mileageCars: MileageCarsSchema[];
}
