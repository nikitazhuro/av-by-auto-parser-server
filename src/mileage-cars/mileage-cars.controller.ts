import { Body, Controller, Get, Post } from '@nestjs/common';

import { MileageCarsService } from './mileage-cars.service';
import {
  CreateMileageCars,
  DeleteCar,
  GetMileageCars,
} from './dto/mileage-cars.dto';
import { AVBYService } from './avby.service';

@Controller('mileage-cars')
export class MileageCarsController {
  constructor(
    private readonly mileageCarsService: MileageCarsService,
    private readonly avbyService: AVBYService,
  ) {}

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

  @Get('fetch-all')
  fetchAllMileageCars() {
    return this.avbyService.fetchAllMileageCarsFromAV();
  }

  @Get('get-all')
  getAllMileageCars() {
    return this.mileageCarsService.all();
  }

  @Get('rewrite-old')
  rewriteOldDataToNewTable() {
    return this.avbyService.rewriteOldDataToNewTable();
  }
}
