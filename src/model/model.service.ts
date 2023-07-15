import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { v4 } from 'uuid';

import { ModelSchema, IModel } from './model.schema';
import { CreateModelDto } from './dto/model.dto';
import { BrandSchema } from 'src/brand/brand.schema';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel(ModelSchema)
    private modelsRepository: typeof ModelSchema,
    @InjectModel(BrandSchema)
    private brandsRepository: typeof BrandSchema,
  ) {}

  async getModels(brand: string) {
    return this.modelsRepository.findAll({
      where: {
        brandUUID: brand,
      },
    });
  }

  async getModelsByBrand(brandUUID: string) {
    return this.modelsRepository.findAll({
      where: { brandUUID },
      include: { all: true },
    });
  }
  async fetchModelsFromAVBY() {
    const brands = await this.brandsRepository.findAll();

    for (let i = 0; i < brands.length; i++) {
      const avBrandId = brands[i].customIds['avby'];
      const brandUUID = brands[i].uuid;

      const { data } = await axios.get<Array<CreateModelDto>>(
        `https://api.av.by/offer-types/cars/catalog/brand-items/${avBrandId}/models`,
      );

      for (let j = 0; j < data.length; j++) {
        const modelTitle = data[j].name.toLowerCase();
        const modelId = data[j].id;

        const model = await this.modelsRepository.findOne({
          where: {
            title: modelTitle,
            brandUUID,
          },
        });

        if (!model) {
          const resultData: IModel = {
            uuid: v4(),
            brandUUID,
            title: modelTitle,
            customIds: {
              avby: modelId,
            },
          };

          this.modelsRepository.create(resultData);
        } else if (!model.customIds['avby'] && model.customIds['avby'] !== 0) {
          model.customIds = {
            ...model.customIds,
            avby: modelId,
          };

          await model.save();
        }
      }
    }
  }
}
