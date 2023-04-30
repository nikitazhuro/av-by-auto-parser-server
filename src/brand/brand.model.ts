import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { ModelSchema } from 'src/model/model.model';

export interface ICustomIds {
  avby: number;
}

export interface IMileageCar {
  uuid: string;
  title: string;
  customIds: ICustomIds;
}

@Table({ tableName: 'brands' })
export class BrandModel extends Model<BrandModel, IMileageCar> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.JSON })
  customIds: ICustomIds;

  @HasMany(() => ModelSchema)
  models: ModelSchema[];
}
