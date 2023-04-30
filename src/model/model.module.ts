import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { ModelSchema } from './model.model';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { BrandModel } from 'src/brand/brand.model';

@Module({
  imports: [SequelizeModule.forFeature([ModelSchema, BrandModel])],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
