import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MileageCarsModule } from './mileage-cars/mileage-cars.module';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { GenerationModule } from './generation/generation.module';
import { PhoneNumbersModule } from './phone-number/phone-numbers.module';

import { MileageCarsSchema } from './mileage-cars/mileage-cars.schema';
import { BrandSchema } from './brand/brand.schema';
import { ModelSchema } from './model/model.schema';
import { GenerationSchema } from './generation/generation.schema';
import { PhoneNumbersSchema } from './phone-number/phone-numbers.schema';
import { MileageCarsNumbersSchema } from './mileage-cars/mileage-cars-numbers.schema';

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
        MileageCarsSchema,
        BrandSchema,
        ModelSchema,
        GenerationSchema,
        PhoneNumbersSchema,
        MileageCarsNumbersSchema,
      ],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MileageCarsModule,
    ModelModule,
    BrandModule,
    GenerationModule,
    PhoneNumbersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
