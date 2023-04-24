import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MileageCarsModule } from './mileage-cars/mileage-cars.module';
import { MileageCarsModel } from './mileage-cars/mileage-cars.model';
import { ConfigModule } from '@nestjs/config';

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
      models: [MileageCarsModel],
      autoLoadModels: true,
    }),
    MileageCarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
