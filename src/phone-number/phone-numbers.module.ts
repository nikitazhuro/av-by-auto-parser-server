import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { PhoneNumbersController } from './phone-numbers.controller';
import { PhoneNumbersService } from './phone-numbers.service';
import { ModelSchema } from 'src/model/model.schema';
import { PhoneNumbersSchema } from './phone-numbers.schema';
import { MileageCarsNumbersSchema } from 'src/mileage-cars/mileage-cars-numbers.schema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      PhoneNumbersSchema,
      ModelSchema,
      MileageCarsNumbersSchema,
    ]),
  ],
  controllers: [PhoneNumbersController],
  providers: [PhoneNumbersService],
})
export class PhoneNumbersModule {}
