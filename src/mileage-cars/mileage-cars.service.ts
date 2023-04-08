import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';

import { MileageCarsModel } from './mileage-cars.model';
import { CreateMileageCars, GetMileageCars } from './dto/mileage-cars.dto';

@Injectable()
export class MileageCarsService {
  constructor(
    @InjectModel(MileageCarsModel)
    private mileageCarsRepository: typeof MileageCarsModel,
  ) {}

  async create(createMileageCars: CreateMileageCars) {
    const { brand, model, generation, data } = createMileageCars;

    const dataToSave = [];

    for (let i = 0; i < data.length; i++) {
      const { year, ...otherData } = data[i];
      dataToSave.push({
        uuid: v4(),
        brand,
        model,
        generation,
        year,
        data: otherData,
      });
    }

    for (let i = 0; i < dataToSave.length; i++) {
      const dataFromDB = await this.mileageCarsRepository.findOne({
        where: {
          brand,
          model,
          generation,
          year: dataToSave[i].year,
        },
      });

      if (dataFromDB) {
        const oldData = JSON.parse(JSON.stringify(dataFromDB.data));

        const oldLast5Ids = oldData.lastSoldCars.slice(0, 5).map((e) => e.id);

        for (let j = dataToSave[i].data?.lastSoldCars.length - 1; j >= 0; j--) {
          if (!oldLast5Ids.includes(dataToSave[i].data?.lastSoldCars[j]?.id)) {
            oldData.lastSoldCars.unshift(dataToSave[i].data?.lastSoldCars[j]);
          } else {
            continue;
          }
        }

        dataFromDB.data = oldData;

        await dataFromDB.save();
      } else {
        await this.mileageCarsRepository.create(dataToSave[i]);
      }
    }
  }

  async getAll(getMileageCars: GetMileageCars) {
    if (getMileageCars.year) {
      return this.mileageCarsRepository.findAll({
        where: {
          brand: getMileageCars.brand,
          model: getMileageCars.model,
          generation: getMileageCars.generation,
          year: getMileageCars.year,
        },
      });
    }
    return this.mileageCarsRepository.findAll({
      where: {
        brand: getMileageCars.brand,
        model: getMileageCars.model,
        generation: getMileageCars.generation,
      },
    });
  }
}
