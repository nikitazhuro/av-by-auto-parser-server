import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import {
  MileageCarsModel,
  MileageCarsNewTestModel,
} from './mileage-cars.model';
import { MileageCarsController } from './mileage-cars.controller';
import { MileageCarsService } from './mileage-cars.service';
import { ModelSchema } from 'src/model/model.model';
import { AVBYService } from './avby.service';
import { FileModule } from 'src/files/file.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      MileageCarsModel,
      ModelSchema,
      MileageCarsNewTestModel,
    ]),
    FileModule,
  ],
  controllers: [MileageCarsController],
  providers: [MileageCarsService, AVBYService],
  exports: [MileageCarsService],
})
export class MileageCarsModule {}
