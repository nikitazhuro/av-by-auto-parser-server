import { Controller, Get, Query } from '@nestjs/common';

import { GenerationService } from './generation.service';

@Controller('generations')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Get()
  getGenerations() {
    return this.generationService.getGenerations();
  }

  @Get('model-generations')
  getModelGenerations(@Query('model') modelUUID: string) {
    return this.generationService.getModelGenerations(modelUUID);
  }

  @Get('av-parse')
  parseGensFromAV() {
    return this.generationService.parseGensFromAV();
  }
}
