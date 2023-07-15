import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { v4 } from 'uuid';

import { GenerationSchema, IGeneration } from './generation.schema';
import { ModelSchema } from 'src/model/model.schema';

@Injectable()
export class GenerationService {
  constructor(
    @InjectModel(GenerationSchema)
    private generationsRepository: typeof GenerationSchema,
    @InjectModel(ModelSchema)
    private modelsRepository: typeof ModelSchema,
  ) {}

  async getGenerations() {
    return this.generationsRepository.findAll({
      include: {
        all: true,
      },
    });
  }

  async getModelGenerations(modelUUID: string) {
    return this.generationsRepository.findAll({
      where: { modelUUID },
    });
  }

  async parseGensFromAV() {
    const models = await this.modelsRepository.findAll({
      include: {
        all: true,
      },
    });

    for (let i = 0; i < models.length; i++) {
      const avModelId = models[i].customIds['avby'];
      const avBrandId = models[i].brand.customIds['avby'];
      const brandUUID = models[i].brand.uuid;
      const modelUUID = models[i].uuid;

      const url = `https://api.av.by/offer-types/cars/catalog/brand-items/${avBrandId}/models/${avModelId}/generations`;

      const { data } = await axios.get(url);

      for (let k = 0; k < data.length; k++) {
        const { id, yearFrom, yearTo, name, ...other } = data[k];

        const gen = await this.generationsRepository.findOne({
          where: {
            brandUUID,
            modelUUID,
            title: name,
          },
        });

        if (!gen) {
          const createConfig: IGeneration = {
            uuid: v4(),
            brandUUID,
            yearFrom,
            yearTo,
            data: other,
            modelUUID,
            title: name,
            customIds: {
              avby: id,
            },
          };

          this.generationsRepository.create(createConfig);
        } else if (!gen.customIds['avby'] && gen.customIds['avby'] !== 0) {
          gen.customIds = {
            ...gen.customIds,
            avby: id,
          };

          await gen.save();
        }
      }
    }

    return 'Complete';
  }
}
