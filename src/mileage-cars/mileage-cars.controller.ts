import { Body, Controller, Get, Query, Post } from '@nestjs/common';

import { MileageCarsService } from './mileage-cars.service';
import { DeleteCar, GetMileageCars } from './dto/mileage-cars.dto';
import { AVBYService } from './avby.service';

@Controller('mileage-cars')
export class MileageCarsController {
  constructor(
    private readonly mileageCarsService: MileageCarsService,
    private readonly avbyService: AVBYService,
  ) {}

  @Post()
  getAll(@Body() getMileageCars: GetMileageCars) {
    return this.mileageCarsService.getAll(getMileageCars);
  }

  @Post('delete')
  gelete(@Body() deleteCar: DeleteCar) {
    return this.mileageCarsService.delete(deleteCar);
  }

  @Get('fetch-all')
  fetchAllMileageCars(@Query('withPhotos') withPhotos: string) {
    return this.avbyService.fetchAllMileageCarsFromAV(
      withPhotos === '1' ? true : false,
    );
  }
}
