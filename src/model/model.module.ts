import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { ModelSchema } from './model.schema';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { BrandSchema } from 'src/brand/brand.schema';
import { GenerationSchema } from 'src/generation/generation.schema';

@Module({
  imports: [
    SequelizeModule.forFeature([ModelSchema, BrandSchema, GenerationSchema]),
  ],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
