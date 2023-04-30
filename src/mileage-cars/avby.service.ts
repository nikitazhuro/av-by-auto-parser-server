import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';
import axios from 'axios';

import { IMileageCarNewTest, MileageCarsModel } from './mileage-cars.model';
import { MileageCarFromAv } from './dto/mileage-cars.dto';
import { ModelSchema } from 'src/model/model.model';
import { GenFromAv } from './utils/gens';
import { MileageCarsNewTestModel } from './mileage-cars.model';
import { FileService } from 'src/files/file.service';
import { BrandModel } from 'src/brand/brand.model';
const data = {
  uuid: '859c03b4-d4e1-404a-98e2-434d4280f45f',
  generation: 'C5',
  customIds: {
    avby: { brandsId: 6, modelId: 5814, generationId: 4325, carId: 104142948 },
  },
  year: 2002,
  photos: [
    '080f4a02-4124-43b2-93f2-16203e8c5dee',
    '5d9beb91-48f1-4b30-b6a0-7827f7d7cb8c',
    'aa23cc28-c170-4e0d-89f9-bc806ce2a9a7',
    '95c79d3e-2e7c-4bfe-86f8-688ba1e57d0c',
    '8ab0735f-e6b4-4bf8-8eb8-819b55dd0c84',
    '60519856-dfd2-4c04-9da3-7796928d1ac1',
    'f43d0a4d-2d07-4dd0-bc0d-113ee64c42f1',
    'd73d4728-fd39-49d5-943d-b3e295082f65',
    'e820dd04-0f1a-4396-8bfc-1cb06ab04910',
  ],
  mileage_km: '370000',
  data: {
    id: 104142948,
    originalDaysOnSale: 20,
    advertType: 'cars',
    status: 'removed',
    publicStatus: { label: 'Продано', name: 'sold' },
    price: {
      usd: { currency: 'usd', amount: 8250, amountFiat: 8250 },
      byn: { currency: 'byn', amount: 24272, amountFiat: 24272.33 },
      rub: { currency: 'rub', amount: 673894, amountFiat: 673894.3 },
      eur: { currency: 'eur', amount: 7526, amountFiat: 7526.07 },
    },
    description:
      'Автомобиль в хорошем состоянии,проблем нема. Мотор обслужен, поменен ГРМ,компенсаторы, новый АКБ. Резина по износу, почти новая. Кузов целый, красить не надо. Подвеска не гремит, не давно перебирал. По элетрике всё работает. Продаём по неоходимости, звоните,кому интересно',
    exchange: {
      type: 'without_exchange',
      label: 'Обмен не интересует',
      comment: '',
      exchangeAllowed: 'denied',
    },
    version: 1,
    publishedAt: '2023-03-27T19:36:27+0000',
    indexPromo: false,
    top: false,
    highlight: false,
    removeReason: 'sold_avby',
    renewedAt: '2023-04-13T05:47:14+0000',
    removedAt: '2023-04-15T12:43:40+0000',
    financeAdvertMinMonthlyPayment: {
      productId: 71,
      minPrice: 248,
      types: ['leasing'],
      currency: 'usd',
    },
    sellerName: '',
    questionAllowed: false,
    locationName: 'Гомель',
    shortLocationName: 'Гомель',
    properties: [
      { value: 'Audi', id: 2, name: 'brand', fallbackType: 'string' },
      { value: 'A6 Allroad', id: 3, name: 'model', fallbackType: 'string' },
      { value: 'C5', id: 4, name: 'generation', fallbackType: 'string' },
      { value: '2002', id: 6, name: 'year', fallbackType: 'string' },
      { value: '2.5', id: 13, name: 'engine_capacity', fallbackType: 'string' },
      { value: 'дизель', id: 14, name: 'engine_type', fallbackType: 'string' },
      {
        value: 'механика',
        id: 7,
        name: 'transmission_type',
        fallbackType: 'string',
      },
      {
        value: 'C5 (2000 - 2006)',
        id: 5,
        name: 'generation_with_years',
        fallbackType: 'string',
      },
      { value: true, id: 52, name: 'alloy_wheels', fallbackType: 'boolean' },
      { value: true, id: 53, name: 'railings', fallbackType: 'boolean' },
      { value: true, id: 22, name: 'abs', fallbackType: 'boolean' },
      { value: true, id: 23, name: 'esp', fallbackType: 'boolean' },
      {
        value: true,
        id: 24,
        name: 'anti_slip_system',
        fallbackType: 'boolean',
      },
      { value: true, id: 25, name: 'immobilizer', fallbackType: 'boolean' },
      { value: true, id: 26, name: 'alarm', fallbackType: 'boolean' },
      { value: true, id: 27, name: 'front_safebags', fallbackType: 'boolean' },
      { value: true, id: 28, name: 'side_safebags', fallbackType: 'boolean' },
      { value: true, id: 29, name: 'rear_safebags', fallbackType: 'boolean' },
      {
        value: 'тёмный',
        id: 20,
        name: 'interior_color',
        fallbackType: 'string',
      },
      {
        value: 'искусственная кожа',
        id: 21,
        name: 'interior_material',
        fallbackType: 'string',
      },
      { value: true, id: 47, name: 'cruise_control', fallbackType: 'boolean' },
      {
        value: true,
        id: 49,
        name: 'electro_seat_adjustment',
        fallbackType: 'boolean',
      },
      {
        value: true,
        id: 50,
        name: 'front_glass_lift',
        fallbackType: 'boolean',
      },
      { value: true, id: 51, name: 'rear_glass_lift', fallbackType: 'boolean' },
      { value: true, id: 36, name: 'seat_heating', fallbackType: 'boolean' },
      { value: true, id: 38, name: 'mirror_heating', fallbackType: 'boolean' },
      { value: true, id: 41, name: 'climate_control', fallbackType: 'boolean' },
      { value: true, id: 42, name: 'conditioner', fallbackType: 'boolean' },
      { value: true, id: 55, name: 'aux_ipod', fallbackType: 'boolean' },
      { value: true, id: 57, name: 'cd_mp3_player', fallbackType: 'boolean' },
      { value: true, id: 58, name: 'usb', fallbackType: 'boolean' },
      { value: true, id: 43, name: 'xenon_lights', fallbackType: 'boolean' },
      { value: true, id: 44, name: 'fog_lights', fallbackType: 'boolean' },
      { value: 'универсал', id: 16, name: 'body_type', fallbackType: 'string' },
      {
        value: 'постоянный полный привод',
        id: 17,
        name: 'drive_type',
        fallbackType: 'string',
      },
      { value: 'синий', id: 18, name: 'color', fallbackType: 'string' },
      { value: 370000, id: 12, name: 'mileage_km', fallbackType: 'int' },
      {
        value: 'с пробегом',
        id: 15,
        name: 'condition',
        fallbackType: 'string',
      },
      { value: 8250, id: 11, name: 'price_amount_usd', fallbackType: 'int' },
    ],
    publicUrl: 'https://cars.av.by/audi/a6-allroad/104142948',
    year: 2002,
    metadata: {
      condition: { id: 2, label: 'с пробегом' },
      brandId: 6,
      brandSlug: 'audi',
      modelId: 5814,
      modelSlug: 'a6-allroad',
      generationId: 4325,
      year: 2002,
    },
    foreignIp: false,
  },
  createdAt: '2023-04-30T14:46:46.791Z',
  updatedAt: '2023-04-30T14:46:46.791Z',
  brandUUID: '3015d850-c13a-440c-b3e6-3be5eec87126',
  modelUUID: 'ab9372f5-3521-4658-abb6-316abf49017a',
};

@Injectable()
export class AVBYService {
  constructor(
    @InjectModel(MileageCarsNewTestModel)
    private mileageCarsNewTestRep: typeof MileageCarsNewTestModel,
    @InjectModel(MileageCarsModel)
    private mileageCarsRep: typeof MileageCarsModel,
    @InjectModel(BrandModel)
    private brandsRep: typeof BrandModel,
    @InjectModel(ModelSchema)
    private modelsRepository: typeof ModelSchema,
    private readonly fileService: FileService,
  ) {}

  async fetchAllMileageCarsFromAV() {
    try {
      const models = await this.modelsRepository.findAll({
        include: {
          all: true,
        },
      });

      for (let i = 59; i < 70; i++) {
        const brandId = models[i].brand.customIds.avby;
        const modelId = models[i].customIds.avby;

        await this.fetchMileageCarsForYearsFromAv({
          brandId,
          modelId,
          brandUUID: models[i].brandUUID,
          modelUUID: models[i].uuid,
        });
      }
    } catch (error) {}
  }

  async rewriteOldDataToNewTable() {
    const oldData = await this.mileageCarsRep.findAll({
      include: {
        all: true,
      },
    });

    for (let k = 0; k < oldData.length; k++) {
      const cars = oldData[k].data.lastSoldCars;

      if (cars.length) {
        for (let i = 0; i < cars.length; i++) {
          const brand = await this.brandsRep.findOne({
            where: {
              customIds: {
                avby: cars[i].metadata.brandId,
              },
            },
          });

          const model = await this.modelsRepository.findOne({
            where: {
              customIds: {
                avby: cars[i].metadata.modelId,
              },
            },
          });

          await this.checkLastSoldCarAndSave({
            lastSoldCar: cars[i],
            year: cars[i].year,
            brandId: cars[i].metadata.brandId,
            modelId: cars[i].metadata.modelId,
            genId: cars[i].metadata.generationId,
            genName: cars[i].properties.find((e) => e.name === 'generation')
              .value,
            brandUUID: brand.uuid,
            modelUUID: model.uuid,
          });
        }

        oldData[k].data.lastSoldCars = [];

        await oldData[k].save();
      }
    }
  }

  private async getGensFromAVBY(brandId: number, modelId: number) {
    try {
      const { data } = await axios.get<Array<GenFromAv>>(
        `https://api.av.by/offer-types/cars/catalog/brand-items/${brandId}/models/${modelId}/generations`,
      );

      return data;
    } catch (error) {}
  }

  private async fetchMileageCarsForYearsFromAv({
    brandId,
    modelId,
    brandUUID,
    modelUUID,
  }) {
    try {
      const gens = await this.getGensFromAVBY(brandId, modelId);

      if (gens.length) {
        for (let j = 0; j < gens.length; j++) {
          if (gens[j]?.yearTo && gens[j]?.yearFrom) {
            for (let k = gens[j]?.yearFrom; k <= gens[j]?.yearTo; k++) {
              await this.fetchMileageCarsPerYearFromAv({
                brandId,
                modelId,
                genId: gens[j].id,
                year: k,
                genName: gens[j].name,
                brandUUID,
                modelUUID,
              });
            }
          }

          if (!gens[j]?.yearTo && gens[j]?.yearFrom) {
            const year = new Date().getFullYear();

            for (let k = gens[j]?.yearFrom; k <= year; k++) {
              await this.fetchMileageCarsPerYearFromAv({
                brandId,
                modelId,
                genId: gens[j].id,
                year: k,
                genName: gens[j].name,
                brandUUID,
                modelUUID,
              });
            }
          }
        }
      }
    } catch (error) {}
  }

  private async fetchMileageCarsPerYearFromAv({
    brandId,
    modelId,
    genId,
    year,
    genName,
    brandUUID,
    modelUUID,
  }) {
    try {
      const data = await this.getLastSoldMileageCarsFromAVBY(
        brandId,
        modelId,
        genId,
        year,
      );

      if (data.lastSoldAdverts.length) {
        for (let i = 0; i < data.lastSoldAdverts.length; i++) {
          const lastSoldCar = data.lastSoldAdverts[i];

          await this.checkLastSoldCarAndSave({
            lastSoldCar,
            brandId,
            modelId,
            genId: genId,
            genName,
            year,
            brandUUID,
            modelUUID,
          });
        }
      }
    } catch (error) {}
  }

  private async getLastSoldMileageCarsFromAVBY(
    brandId: number,
    modelId: number,
    genId: number,
    year: number,
  ) {
    const url = `https://api.av.by/offer-types/cars/price-statistics?brand=${brandId}&generation=${genId}&model=${modelId}&year=${year}`;

    try {
      const { data } = await axios.get<MileageCarFromAv>(url);

      return data;
    } catch (error) {}
  }

  private async checkLastSoldCarAndSave({
    lastSoldCar,
    brandUUID,
    modelUUID,
    modelId,
    brandId,
    genId,
    genName,
    year,
  }) {
    try {
      const carFromDB = await this.mileageCarsNewTestRep.findOne({
        where: {
          customIds: {
            avby: {
              carId: lastSoldCar.id,
            },
          },
        },
      });

      if (!carFromDB) {
        const photosUrls = lastSoldCar.photos.map((photosObj) => {
          if (photosObj.medium) {
            return photosObj.medium.url;
          }
          if (photosObj.big) {
            return photosObj.big.url;
          }
          if (photosObj.small) {
            return photosObj.small.url;
          }
          if (photosObj.extrasmall) {
            return photosObj.extrasmall.url;
          }
        });

        const photosUUIDs = await this.fileService.fetchPhotosFromAv(
          photosUrls,
        );

        const createCarConfig: IMileageCarNewTest = {
          uuid: v4(),
          brandUUID,
          modelUUID,
          generation: genName,
          customIds: {
            avby: {
              brandsId: brandId,
              modelId: modelId,
              generationId: genId,
              carId: lastSoldCar.id,
            },
          },
          year,
          mileage_km: lastSoldCar.properties.find(
            (prop) => prop.name === 'mileage_km',
          ).value,
          photos: photosUUIDs,
          data: lastSoldCar,
        };

        delete createCarConfig.data.photos;

        await this.mileageCarsNewTestRep.create(createCarConfig);
      }
    } catch (error) {}
  }
}
