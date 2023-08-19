import { Controller, Get } from '@nestjs/common';

import { VinService } from './vin.service';

@Controller('vins')
export class VinController {
  constructor(private readonly vinService: VinService) {}

  @Get('fetch-all')
  fetchAll() {
    return this.vinService.fetchAll();
  }

  @Get('count')
  count() {
    return this.vinService.getVinsCount();
  }

  @Get()
  getAll() {
    return this.vinService.getVins();
  }
}
