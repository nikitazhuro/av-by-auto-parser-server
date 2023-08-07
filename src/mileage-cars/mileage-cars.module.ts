import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { MileageCarsSchema } from './mileage-cars.schema';
import { MileageCarsController } from './mileage-cars.controller';
import { MileageCarsService } from './mileage-cars.service';
import { ModelSchema } from 'src/model/model.schema';
import { AVBYService } from './avby.service';
import { FileModule } from 'src/files/file.module';
import { BrandSchema } from 'src/brand/brand.schema';
import { GenerationSchema } from 'src/generation/generation.schema';
import { PhoneNumbersSchema } from 'src/phone-number/phone-numbers.schema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ModelSchema,
      GenerationSchema,
      MileageCarsSchema,
      BrandSchema,
      ModelSchema,
      PhoneNumbersSchema,
    ]),
    FileModule,
  ],
  controllers: [MileageCarsController],
  providers: [MileageCarsService, AVBYService],
  exports: [MileageCarsService],
})
export class MileageCarsModule {}
