import { Controller, Get, Query } from '@nestjs/common';

import { ModelService } from './model.service';

@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  getModels(@Query('brand') brand: string) {
    return this.modelService.getModels(brand);
  }

  @Get('brand-models')
  getBrandModels(@Query('brandUUID') brandUUID: string) {
    return this.modelService.getModelsByBrand(brandUUID);
  }

  @Get('av-fetch')
  fetchModelsFromAVBY() {
    return this.modelService.fetchModelsFromAVBY();
  }
}
