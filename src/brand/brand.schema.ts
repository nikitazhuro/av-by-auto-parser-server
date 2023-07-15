import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { GenerationSchema } from 'src/generation/generation.schema';
import { ModelSchema } from 'src/model/model.schema';

export interface ICustomIds {
  avby: number;
}

export interface IMileageCar {
  uuid: string;
  title: string;
  customIds: ICustomIds;
}

@Table({ tableName: 'brands' })
export class BrandSchema extends Model<BrandSchema, IMileageCar> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.JSON })
  customIds: ICustomIds;

  @HasMany(() => ModelSchema)
  models: ModelSchema[];

  @HasMany(() => GenerationSchema)
  generations: GenerationSchema[];
}
