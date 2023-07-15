import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { GenerationSchema } from './generation.schema';
import { GenerationController } from './generation.controller';
import { GenerationService } from './generation.service';
import { BrandSchema } from 'src/brand/brand.schema';
import { ModelSchema } from 'src/model/model.schema';

@Module({
  imports: [
    SequelizeModule.forFeature([GenerationSchema, BrandSchema, ModelSchema]),
  ],
  controllers: [GenerationController],
  providers: [GenerationService],
  exports: [GenerationService],
})
export class GenerationModule {}
