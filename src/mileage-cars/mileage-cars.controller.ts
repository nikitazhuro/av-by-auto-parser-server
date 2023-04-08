import { Body, Controller, Post, Get } from '@nestjs/common';

import { MileageCarsService } from './mileage-cars.service';
import { CreateMileageCars, GetMileageCars } from './dto/mileage-cars.dto';

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
}
