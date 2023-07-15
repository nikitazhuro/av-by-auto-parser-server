import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { BrandSchema } from './brand.schema';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [SequelizeModule.forFeature([BrandSchema])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
