import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { v4 } from 'uuid';

import { BrandModel, IMileageCar } from './brand.model';
import { CreateBrandDto } from './dto/brands.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(BrandModel)
    private brandsRepository: typeof BrandModel,
  ) {}

  async getBrandsFromAVBY() {
    return this.brandsRepository.findAll({
      include: {
        all: true,
      },
    });
  }
  async fetchBrandsFromAVBY() {
    const { data } = await axios.get<Array<CreateBrandDto>>(
      'https://api.av.by/offer-types/cars/catalog/brand-items',
    );

    for (let i = 0; i < data.length; i++) {
      const brandTitle = data[i].name.toLowerCase();
      const brandAVId = data[i].id;

      const brand = await this.brandsRepository.findOne({
        where: {
          title: brandTitle,
        },
      });

      if (!brand) {
        const result: IMileageCar = {
          uuid: v4(),
          title: brandTitle,
          customIds: {
            avby: brandAVId,
          },
        };

        this.brandsRepository.create(result);
      } else if (!brand.customIds['avby'] && brand.customIds['avby'] !== 0) {
        brand.customIds = {
          ...brand.customIds,
          avby: brandAVId,
        };

        await brand.save();
      }
    }
  }
}
