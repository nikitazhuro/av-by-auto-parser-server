import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';

import { VinSchema } from './vin.schema';
import { ModelSchema } from 'src/model/model.schema';
import { v4 } from 'uuid';

@Injectable()
export class VinService {
  constructor(
    @InjectModel(VinSchema)
    private vinRepository: typeof VinSchema,
    @InjectModel(ModelSchema)
    private modelRepository: typeof ModelSchema,
  ) {}

  async fetchAll() {
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
          const carsPerPage = await this.fetchCarsPerPage(j, brandId, modelId);

          await this.fetchNumbersPerCarsPage(carsPerPage);
        }
      }
    }
    console.log('Complete Numbers parsing', new Date().toDateString());
  }

  async fetchNumbersPerCarsPage(carsPerPage) {
    for (let i = 0; i < carsPerPage.data.adverts.length; i++) {
      const { id } = carsPerPage.data.adverts[i];

      try {
        const response = await axios.get(
          `https://api.av.by/offer-types/cars/offers/${id}/vin`,
          {
            headers: {
              accept: '*/*',
              'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
              'content-type': 'application/json',
              'sec-ch-ua':
                '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-site',
              'x-api-key': 'w061a506c55c69d59f91e2e',
              'x-device-type': 'web.desktop',
              Referer: 'https://cars.av.by/',
            },
            method: 'GET',
          },
        );

        const { vin } = response.data;

        const vinFromDB = await this.vinRepository.findOne({ where: { vin } });

        if (vinFromDB) {
          if (!vinFromDB.avCarsIds.includes(id)) {
            vinFromDB.avCarsIds = [...vinFromDB.avCarsIds, id];

            await vinFromDB.save();
          }
        } else {
          const createVinConfig = {
            uuid: v4(),
            vin,
            avCarsIds: [id],
          };

          await this.vinRepository.create(createVinConfig);
        }
      } catch (error) {
        console.log(error);
      }
    }
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

  async getVinsCount() {
    return this.vinRepository.count();
  }

  async getVins() {
    return this.vinRepository.findAll({ limit: 10 });
  }
}
