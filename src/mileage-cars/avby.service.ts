import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';

import { ModelSchema } from 'src/model/model.schema';

import { MileageCarsSchema } from './mileage-cars.schema';
import { FileService } from 'src/files/file.service';
import { MileageCarsService } from './mileage-cars.service';
import {
  createCarConfigHelper,
  getPhotosUrlsFromLastSoldAvCar,
} from './helpers/index';
import {
  IFetchMileageCarsForYearsFromAv,
  IFetchPhotosConfig,
  IGenerationFromAv,
  ILastSoldCarsConfig,
  IMileageCarPerYearConfig,
  IMileageCarPerYearCreateConfig,
  MileageCarFromAv,
} from './types';
import { FetchMileageCarsQuery } from './dto/mileage-cars.dto';
import { GenerationSchema } from 'src/generation/generation.schema';

@Injectable()
export class AVBYService {
  constructor(
    private readonly mileageCarsService: MileageCarsService,
    @InjectModel(MileageCarsSchema)
    private mileageCarsRepository: typeof MileageCarsSchema,
    @InjectModel(GenerationSchema)
    private generationRepository: typeof GenerationSchema,
    private readonly fileService: FileService,
  ) {}

  async fetchAllMileageCarsFromAV(query: FetchMileageCarsQuery) {
    const { withPhotos, generationUUIDs, modelUUID, brandUUID } = query;

    const completeParsingLog = async () => {
      console.log(
        'Complete parsing',
        new Date().toDateString(),
        new Date().toLocaleTimeString(),
      );
    };

    try {
      if (generationUUIDs) {
        await this.queryFetchWithGens(generationUUIDs, withPhotos);
        await completeParsingLog();

        return;
      } else if (modelUUID) {
        await this.queryFetchWithModelUUID(modelUUID, withPhotos);
        await completeParsingLog();

        return;
      } else if (brandUUID) {
        await this.queryFetchWithBrandUUID(brandUUID, withPhotos);
        await completeParsingLog();

        return;
      } else {
        await this.fetchAll(withPhotos);
        await completeParsingLog();

        return;
      }
    } catch (error) {}
  }

  async queryFetchWithBrandUUID(brandUUID: string, withPhotos: string) {
    const gens = await this.generationRepository.findAll({
      where: { brandUUID },
      include: { all: true },
    });

    for (let i = 0; i < gens.length; i++) {
      await this.fetchPerGenWrapper(gens[i], withPhotos);
    }
  }

  async queryFetchWithGens(generationUUIDs: string, withPhotos: string) {
    const genUUIDsArr = generationUUIDs.split(',');

    for (let i = 0; i < genUUIDsArr.length; i++) {
      const genUUID = genUUIDsArr[i];

      const gen = await this.generationRepository.findOne({
        where: { uuid: genUUID },
        include: { all: true },
      });

      await this.fetchPerGenWrapper(gen, withPhotos);
    }
  }

  async queryFetchWithModelUUID(modelUUID: string, withPhotos: string) {
    const gens = await this.generationRepository.findAll({
      where: { modelUUID },
      include: { all: true },
    });

    for (let i = 0; i < gens.length; i++) {
      await this.fetchPerGenWrapper(gens[i], withPhotos);
    }
  }

  async fetchAll(withPhotos) {
    try {
      const gens = await this.generationRepository.findAll({
        include: {
          all: true,
        },
      });

      if (gens.length) {
        for (let j = 0; j < gens.length; j++) {
          await this.fetchPerGenWrapper(gens[j], withPhotos);
        }
      }
    } catch (error) {}
  }

  async fetchPerGenWrapper(gen: GenerationSchema, withPhotos) {
    const config = {
      brandUUID: gen.brand.uuid,
      brandId: gen.brand.customIds.avby,
      brandName: gen.brand.title,
      modelUUID: gen.model.uuid,
      modelId: gen.model.customIds.avby,
      modelName: gen.model.title,
      genUUID: gen.uuid,
      genId: gen.customIds.avby,
      genName: gen.title,
      year: null,
      withPhotos: withPhotos === '1',
    };

    if (gen?.yearTo && gen?.yearFrom) {
      for (let k = gen?.yearFrom; k <= gen?.yearTo; k++) {
        config.year = k;

        await this.fetchMileageCarsPerYearFromAv(config);
      }
    }

    if (!gen?.yearTo && gen?.yearFrom) {
      const year = new Date().getFullYear();

      for (let k = gen?.yearFrom; k <= year; k++) {
        config.year = k;

        await this.fetchMileageCarsPerYearFromAv(config);
      }
    }
  }

  private async getLastSoldMileageCarsFromAVBY(config: ILastSoldCarsConfig) {
    const { brandId, modelId, genId, year } = config;
    const url = `https://api.av.by/offer-types/cars/price-statistics?brand=${brandId}&generation=${genId}&model=${modelId}&year=${year}`;

    try {
      const { data } = await axios.get<MileageCarFromAv>(url);

      return data;
    } catch (error) {}
  }

  private async fetchMileageCarsPerYearFromAv(
    config: IMileageCarPerYearConfig,
  ) {
    try {
      const avFetchConfig = {
        brandId: config.brandId,
        modelId: config.modelId,
        genId: config.genId,
        year: config.year,
      };

      const data = await this.getLastSoldMileageCarsFromAVBY(avFetchConfig);

      if (data.lastSoldAdverts.length) {
        for (let i = 0; i < data.lastSoldAdverts.length; i++) {
          const lastSoldCar = data.lastSoldAdverts[i];

          await this.checkLastSoldCarAndCreate({
            lastSoldCar,
            ...config,
          });
        }
      }
    } catch (error) {}
  }

  private async checkLastSoldCarAndCreate(
    config: IMileageCarPerYearCreateConfig,
  ) {
    try {
      const carFromDB = await this.mileageCarsService.findOneByAvId(
        config.lastSoldCar.id,
      );

      if (!carFromDB) {
        const photosUrls = getPhotosUrlsFromLastSoldAvCar(config.lastSoldCar);

        const photosUUIDs: string[] = [];

        // if (config.withPhotos) {
        //   photosUUIDs = await this.fetchPhotosFromAv({
        //     ...config,
        //     photosUrls,
        //   });
        // }

        const createCarConfig = createCarConfigHelper({
          ...config,
          photosUUIDs,
          photosUrls,
        });

        await this.mileageCarsRepository.create(createCarConfig);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchPhotosFromAv(config: IFetchPhotosConfig) {
    const { brandName, modelName, genName, year, photosUrls } = config;

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
