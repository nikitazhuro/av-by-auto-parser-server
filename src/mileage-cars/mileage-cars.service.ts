import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { MileageCarsModel } from './mileage-cars.model';
import { DeleteCar, GetMileageCars } from './dto/mileage-cars.dto';
import { MileageCarsNewTestModel } from './mileage-cars.model';

@Injectable()
export class MileageCarsService {
  constructor(
    @InjectModel(MileageCarsModel)
    private mileageCarsRepository: typeof MileageCarsModel,
    @InjectModel(MileageCarsNewTestModel)
    private mileageCarsNewTestRep: typeof MileageCarsNewTestModel,
  ) {}

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
