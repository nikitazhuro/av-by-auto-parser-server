import { Controller, Get, Param } from '@nestjs/common';

import { PhoneNumbersService } from './phone-numbers.service';

@Controller('phone-numbers')
export class PhoneNumbersController {
  constructor(private readonly phoneNumbersService: PhoneNumbersService) {}

  @Get('fetch-all')
  fetchAll() {
    return this.phoneNumbersService.fetchAll();
  }

  @Get('phone-cars')
  getAllCompareNumbers() {
    return this.phoneNumbersService.getAllCompareNumbers();
  }

  @Get(':uuid')
  getPhoneNumbersByUUID(@Param('uuid') uuid: string) {
    return this.phoneNumbersService.getPhoneNumbersByUUID(uuid);
  }

  @Get('count')
  getPhoneNumbersCountNew() {
    return this.phoneNumbersService.getPhoneNumbersCountNew();
  }
}
