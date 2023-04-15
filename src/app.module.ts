import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MileageCarsModule } from './mileage-cars/mileage-cars.module';
import { MileageCarsModel } from './mileage-cars/mileage-cars.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Z1234554321z',
      database: 'av_by_auto_parser_db',
      models: [MileageCarsModel],
      autoLoadModels: true,
    }),
    MileageCarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
