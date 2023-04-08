import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { MileageCarsModel } from './mileage-cars.model';
import { MileageCarsController } from './mileage-cars.controller';
import { MileageCarsService } from './mileage-cars.service';

@Module({
  imports: [SequelizeModule.forFeature([MileageCarsModel])],
  controllers: [MileageCarsController],
  providers: [MileageCarsService],
  exports: [MileageCarsService],
})
export class MileageCarsModule {}
