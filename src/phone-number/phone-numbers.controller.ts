import { Controller, Get } from '@nestjs/common';

import { PhoneNumbersService } from './phone-numbers.service';

@Controller('phone-numbers')
export class PhoneNumbersController {
  constructor(private readonly phoneNumbersService: PhoneNumbersService) {}

  @Get('fetch-all')
  fetchAll() {
    return this.phoneNumbersService.fetchAll();
  }

  @Get('count')
  getPhoneNumbersCountNew() {
    return this.phoneNumbersService.getPhoneNumbersCountNew();
  }
}
