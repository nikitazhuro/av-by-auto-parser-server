import { Body, Controller, Get, Query, Post, Param } from '@nestjs/common';

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

  @Get('count')
  getCount() {
    return this.mileageCarsService.getCount();
  }

  @Get('add-generation')
  addGens() {
    return this.mileageCarsService.addGeneration();
  }

  @Post()
  getAll(@Body() getMileageCars: GetMileageCars) {
    return this.mileageCarsService.getAll(getMileageCars);
  }

  // @Get(':uuid')
  // getOneByUUID(@Param('uuid') uuid: string) {
  //   console.log(uuid);

  //   return this.mileageCarsService.getCarByUUID(uuid);
  // }

  @Post('delete')
  gelete(@Body() deleteCar: DeleteCar) {
    return this.mileageCarsService.delete(deleteCar);
  }

  @Get('fetch-all')
  fetchAllMileageCars(@Query() query: FetchMileageCarsQuery) {
    return this.avbyService.fetchAllMileageCarsFromAV(query);
  }
}
