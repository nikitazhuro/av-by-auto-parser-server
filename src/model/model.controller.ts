import { Controller, Get } from '@nestjs/common';

import { ModelService } from './model.service';

@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  getModels() {
    return this.modelService.getModels();
  }

  @Get('av-fetch')
  fetchModelsFromAVBY() {
    return this.modelService.fetchModelsFromAVBY();
  }
}
