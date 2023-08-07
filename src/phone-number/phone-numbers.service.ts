import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';

import { PhoneNumbersSchema } from './phone-numbers.schema';
import { v4 } from 'uuid';
import { ModelSchema } from 'src/model/model.schema';
import { Op } from 'sequelize';

@Injectable()
export class PhoneNumbersService {
  constructor(
    @InjectModel(PhoneNumbersSchema)
    private phoneNumbersRepository: typeof PhoneNumbersSchema,
    @InjectModel(ModelSchema)
    private modelRepository: typeof ModelSchema,
  ) {}

  async fetchAll() {
    try {
      const models = await this.modelRepository.findAll({
        include: { all: true },
      });

      for (let i = 0; i < models.length; i++) {
        const brandId = models[i].brand.customIds.avby;
        const modelId = models[i].customIds.avby;

        const firstPageCars = await this.fetchCarsPerPage(1, brandId, modelId);

        await this.fetchNumbersPerCarsPage(firstPageCars);

        const totalPage = firstPageCars.data.pageCount;

        if (totalPage) {
          for (let j = 1; j <= totalPage; j++) {
            const carsPerPage = await this.fetchCarsPerPage(
              j,
              brandId,
              modelId,
            );

            await this.fetchNumbersPerCarsPage(carsPerPage);
          }
        }
      }
      console.log('Complete Numbers parsing', new Date().toDateString());
    } catch (error) {
      console.log(error);
    }
  }

  getPhoneNumbersCount(): Promise<any> {
    return this.phoneNumbersRepository.count();
  }
  getPhoneNumbersCountNew(): Promise<any> {
    return this.phoneNumbersRepository.count();
  }

  async fetchCarsPerPage(page, brandId, modelId) {
    return await axios.post<any>(
      'https://api.av.by/offer-types/cars/filters/main/apply',
      {
        page: page,
        sorting: 1,
        properties: [
          {
            name: 'brands',
            property: 6,
            value: [
              [
                {
                  name: 'brand',
                  value: brandId,
                },
                {
                  name: 'model',
                  value: modelId,
                },
              ],
            ],
          },
          {
            name: 'price_currency',
            value: 2,
          },
        ],
      },
    );
  }

  async fetchNumbersPerCarsPage(carsPerPage) {
    for (let i = 0; i < carsPerPage.data.adverts.length; i++) {
      const { id } = carsPerPage.data.adverts[i];

      try {
        const { data: numbersList } = await axios.get<Array<any>>(
          `https://api.av.by/offers/${id}/phones`,
        );

        for (let j = 0; j < numbersList.length; j++) {
          const { country, number } = numbersList[j];

          const fullPhoneNumber = `${country?.code}${number}`;

          const existNumber = await this.findPhoneByNumber(fullPhoneNumber);

          if (!existNumber) {
            const createConfig = {
              uuid: v4(),
              number: fullPhoneNumber,
              avCarsIds: [id],
            };

            await this.phoneNumbersRepository.create(createConfig);
          } else {
            if (!existNumber.avCarsIds.includes(id)) {
              existNumber.avCarsIds = [...existNumber.avCarsIds, id];
              await existNumber.save();
            }
          }
        }
      } catch (error) {}
    }
  }

  async getPhoneNumbers() {
    return this.phoneNumbersRepository.findAll({ limit: 10 });
  }

  async findPhoneByNumber(number: string) {
    return this.phoneNumbersRepository.findOne({
      where: {
        number,
      },
    });
  }

  async findPhoneByAvCarId(id: string) {
    const whereConfig = {
      avCarsIds: {
        [Op.in]: [id],
      },
    };

    const number = this.phoneNumbersRepository.findOne({
      where: whereConfig,
    });

    return number;
  }
}
