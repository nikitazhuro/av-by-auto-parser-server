import { Body, Controller, Post } from '@nestjs/common';

import { MileageCarsService } from './mileage-cars.service';
import {
  CreateMileageCars,
  DeleteCar,
  GetMileageCars,
} from './dto/mileage-cars.dto';

@Controller('mileage-cars')
export class MileageCarsController {
  constructor(private readonly mileageCarsService: MileageCarsService) {}

  @Post('create')
  create(@Body() createMileageCars: CreateMileageCars) {
    return this.mileageCarsService.create(createMileageCars);
  }

  @Post()
  getAll(@Body() getMileageCars: GetMileageCars) {
    return this.mileageCarsService.getAll(getMileageCars);
  }

  @Post('delete')
  gelete(@Body() deleteCar: DeleteCar) {
    return this.mileageCarsService.delete(deleteCar);
  }
}
