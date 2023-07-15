import { Controller, Get } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  getBrands() {
    return this.brandService.getBrands();
  }

  @Get('/av')
  getBrandsFromAVBY() {
    return this.brandService.getBrandsFromAVBY();
  }

  @Get('av-fetch')
  fetchBrandsFromAVBY() {
    return this.brandService.fetchBrandsFromAVBY();
  }
}
