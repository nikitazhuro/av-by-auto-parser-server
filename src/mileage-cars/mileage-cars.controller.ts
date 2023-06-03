import { Body, Controller, Get, Query, Post } from '@nestjs/common';

import { MileageCarsService } from './mileage-cars.service';
import {
  DeleteCar,
  FetchMileageCarsQuery,
  GetMileageCars,
} from './dto/mileage-cars.dto';
import { AVBYService } from './avby.service';

@Controller('mileage-cars')
export class MileageCarsController {
  constructor(
    private readonly mileageCarsService: MileageCarsService,
    private readonly avbyService: AVBYService,
  ) {}

  @Get('change-prop')
  changeProperties() {
    return this.mileageCarsService.changeProperties();
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
  fetchAllMileageCars(@Query() query: FetchMileageCarsQuery) {
    return this.avbyService.fetchAllMileageCarsFromAV(query);
  }
}
