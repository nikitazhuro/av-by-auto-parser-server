import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { BrandModel } from './brand.model';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [SequelizeModule.forFeature([BrandModel])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
