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

  async fetchAllMileageCarsFromAV(withPhotos: boolean) {
    try {
      const models = await this.modelsRepository.findAll({
        include: {
          all: true,
        },
      });

      for (let i = 0; i < models.length; i++) {
        const brandId = models[i].brand.customIds.avby;
        const modelId = models[i].customIds.avby;

        if (brandId === 6) {
          await this.fetchMileageCarsForYearsFromAv({
            brandId,
            modelId,
            brandUUID: models[i].brandUUID,
            modelUUID: models[i].uuid,
            withPhotos,
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
            genName:
              cars[i].properties.find((e) => e.name === 'generation')?.value ||
              '',
            brandUUID: brand.uuid,
            modelUUID: model.uuid,
            withPhotos: true,
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
    withPhotos,
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

          await this.checkLastSoldCarAndSave({
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
    withPhotos,
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

        let photosUUIDs: string[] = [];

        const findValueFromProps = (key: string) => {
          return lastSoldCar.properties.find((prop) => prop.name === key).value;
        };
        if (withPhotos) {
          photosUUIDs = await this.fileService.fetchPhotosFromAv({
            brandName: findValueFromProps('brand'),
            modelName: findValueFromProps('model'),
            genName,
            year,
            photosUrls,
          });
        }

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
          mileage_km: findValueFromProps('mileage_km'),
          photos: photosUUIDs,
          data: {
            avbyPhotosLinks: photosUrls,
            ...lastSoldCar,
          },
        };

        delete createCarConfig.data.photos;

        await this.mileageCarsNewTestRep.create(createCarConfig);
      }
    } catch (error) {}
  }
}
