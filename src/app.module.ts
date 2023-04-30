import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MileageCarsModule } from './mileage-cars/mileage-cars.module';
import {
  MileageCarsModel,
  MileageCarsNewTestModel,
} from './mileage-cars/mileage-cars.model';
import { ConfigModule } from '@nestjs/config';
import { BrandModel } from './brand/brand.model';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { ModelSchema } from './model/model.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        MileageCarsModel,
        BrandModel,
        ModelSchema,
        MileageCarsNewTestModel,
      ],
      autoLoadModels: true,
    }),
    MileageCarsModule,
    ModelModule,
    BrandModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
