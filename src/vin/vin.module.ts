import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { VinController } from './vin.controller';
import { VinService } from './vin.service';
import { VinSchema } from './vin.schema';
import { ModelSchema } from 'src/model/model.schema';

@Module({
  imports: [SequelizeModule.forFeature([VinSchema, ModelSchema])],
  controllers: [VinController],
  providers: [VinService],
})
export class VinModule {}
