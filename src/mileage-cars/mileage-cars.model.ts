import { Table, Column, DataType, Model } from 'sequelize-typescript';
import { IData } from './dto/mileage-cars.dto';

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
