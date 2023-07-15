import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MileageCarsModule } from './mileage-cars/mileage-cars.module';
import { MileageCarsSchema } from './mileage-cars/mileage-cars.schema';
import { ConfigModule } from '@nestjs/config';
import { BrandSchema } from './brand/brand.schema';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { ModelSchema } from './model/model.schema';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GenerationSchema } from './generation/generation.schema';
import { GenerationModule } from './generation/generation.module';

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
      models: [MileageCarsSchema, BrandSchema, ModelSchema, GenerationSchema],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MileageCarsModule,
    ModelModule,
    BrandModule,
    GenerationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
