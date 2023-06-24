import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';

import { ModelSchema } from 'src/model/model.model';

import { MileageCarsModel } from './mileage-cars.model';
import { FileService } from 'src/files/file.service';
import { MileageCarsService } from './mileage-cars.service';
import {
  createCarConfigHelper,
  findValueFromProps,
  getPhotosUrlsFromLastSoldAvCar,
} from './helpers/index';
import {
  IFetchMileageCarsForYearsFromAv,
  IGenerationFromAv,
  MileageCarFromAv,
} from './types';
import { FetchMileageCarsQuery } from './dto/mileage-cars.dto';

@Injectable()
export class AVBYService {
  constructor(
    private readonly mileageCarsService: MileageCarsService,
    @InjectModel(MileageCarsModel)
    private mileageCarsRepository: typeof MileageCarsModel,
    @InjectModel(ModelSchema)
    private modelsRepository: typeof ModelSchema,
    private readonly fileService: FileService,
  ) {}

  async fetchAllMileageCarsFromAV(query: FetchMileageCarsQuery) {
    const { withPhotos, brand, model, generations } = query;
    let arrFromGenerationsQueryString = [];

    if (generations) {
      arrFromGenerationsQueryString = generations.split(',').map((gen) => +gen);
    }

    try {
      const models = await this.modelsRepository.findAll({
        include: {
          all: true,
        },
      });

      if (generations || model) {
        const modelSchema = await this.modelsRepository.findOne({
          where: {
            customIds: {
              avby: +model,
            },
          },
        });

        const config: IFetchMileageCarsForYearsFromAv = {
          brandId: +brand,
          modelId: +model,
          brandUUID: modelSchema.brandUUID,
          modelUUID: modelSchema.uuid,
          withPhotos: withPhotos === '1',
        };

        if (generations) {
          for (let i = 0; i < arrFromGenerationsQueryString.length; i++) {
            config.generation = arrFromGenerationsQueryString[i];

            console.log(config, 'config');

            await this.fetchMileageCarsForYearsFromAv(config);
          }
        } else {
          await this.fetchMileageCarsForYearsFromAv(config);
        }
      } else {
        for (let i = 0; i < models.length; i++) {
          const brandId = models[i].brand.customIds.avby;
          const modelId = models[i].customIds.avby;

          await this.fetchMileageCarsForYearsFromAv({
            brandId,
            modelId,
            brandUUID: models[i].brandUUID,
            modelUUID: models[i].uuid,
            withPhotos: withPhotos === '1',
          });
        }
      }

      console.log(
        'Complete parsing',
        new Date().toDateString(),
        new Date().toLocaleTimeString(),
      );

      return 'OK';
    } catch (error) {}
  }

  private async fetchMileageCarsForYearsFromAv({
    brandId,
    modelId,
    brandUUID,
    modelUUID,
    withPhotos,
    generation,
  }: IFetchMileageCarsForYearsFromAv) {
    try {
      const gens = await this.getGensFromAVBY(brandId, modelId);

      if (gens.length) {
        for (let j = 0; j < gens.length; j++) {
          if (generation || generation === 0) {
            if (generation === gens[j].id) {
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
                    withPhotos,
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
                    withPhotos,
                  });
                }
              }
            }
          } else {
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
                  withPhotos,
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
                  withPhotos,
                });
              }
            }
          }
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

  private async fetchMileageCarsPerYearFromAv({
    brandId,
    modelId,
    genId,
    year,
    genName,
    brandUUID,
    modelUUID,
    withPhotos,
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

          await this.checkLastSoldCarAndCreate({
            lastSoldCar,
            brandId,
            modelId,
            genId: genId,
            genName,
            year,
            brandUUID,
            modelUUID,
            withPhotos,
          });
        }
      }
    } catch (error) {}
  }

  private async checkLastSoldCarAndCreate({
    lastSoldCar,
    brandUUID,
    modelUUID,
    modelId,
    brandId,
    genId,
    genName,
    year,
    withPhotos,
  }) {
    try {
      const carFromDB = await this.mileageCarsService.findOneByAvId(
        lastSoldCar.id,
      );

      if (!carFromDB) {
        const photosUrls = getPhotosUrlsFromLastSoldAvCar(lastSoldCar);

        let photosUUIDs: string[] = [];

        if (withPhotos) {
          photosUUIDs = await this.fetchPhotosFromAv({
            brandName: findValueFromProps('brand', lastSoldCar),
            modelName: findValueFromProps('model', lastSoldCar),
            genName,
            year,
            photosUrls,
          });
        }

        const createCarConfig = createCarConfigHelper({
          brandUUID,
          modelUUID,
          genName,
          brandId,
          modelId,
          genId,
          year,
          lastSoldCar,
          photosUUIDs,
          photosUrls,
        });

        await this.mileageCarsRepository.create(createCarConfig);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async getGensFromAVBY(brandId: number, modelId: number) {
    try {
      const { data } = await axios.get<Array<IGenerationFromAv>>(
        `https://api.av.by/offer-types/cars/catalog/brand-items/${brandId}/models/${modelId}/generations`,
      );

      return data;
    } catch (error) {}
  }

  async fetchPhotosFromAv({ brandName, modelName, genName, year, photosUrls }) {
    const photosUUIDs = await this.fileService.fetchPhotosFromAv({
      brandName,
      modelName,
      genName,
      year,
      photosUrls,
    });
    return photosUUIDs;
  }
}
