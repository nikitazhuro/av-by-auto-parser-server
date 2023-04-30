import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';

import { MileageCarsModel } from './mileage-cars.model';
import {
  CreateMileageCars,
  DeleteCar,
  GetMileageCars,
} from './dto/mileage-cars.dto';
import { MileageCarsNewTestModel } from './mileage-cars.model';

@Injectable()
export class MileageCarsService {
  constructor(
    @InjectModel(MileageCarsModel)
    private mileageCarsRepository: typeof MileageCarsModel,
    @InjectModel(MileageCarsNewTestModel)
    private mileageCarsNewTestRep: typeof MileageCarsNewTestModel,
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
      return this.mileageCarsNewTestRep.findAll({
        where: {
          year: getMileageCars.year,
          customIds: {
            avby: {
              brandsId: getMileageCars.brand,
              modelId: getMileageCars.model,
              generationId: getMileageCars.generation,
            },
          },
        },
      });
    }

    return this.mileageCarsNewTestRep.findAll({
      where: {
        customIds: {
          avby: {
            brandsId: getMileageCars.brand,
            modelId: getMileageCars.model,
            generationId: getMileageCars.generation,
          },
        },
      },
    });
  }

  async delete(deleteCar: DeleteCar) {
    try {
      const { uuid, carId } = deleteCar;

      const dataFromDB = await this.mileageCarsRepository.findOne({
        where: {
          uuid,
        },
      });

      const oldData = JSON.parse(JSON.stringify(dataFromDB.data));

      oldData.lastSoldCars = oldData.lastSoldCars.filter(
        (car) => car.id !== carId,
      );

      dataFromDB.data = oldData;

      await dataFromDB.save();

      return 'OK';
    } catch (error) {
      return new HttpException('Ошибка при удалении', HttpStatus.BAD_REQUEST);
    }
  }
}
