import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DeleteCar, GetMileageCars } from './dto/mileage-cars.dto';
import { MileageCarsModel } from './mileage-cars.model';

@Injectable()
export class MileageCarsService {
  constructor(
    @InjectModel(MileageCarsModel)
    private mileageCarsNewTestRep: typeof MileageCarsModel,
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

  async findOneByAvId(carId: number) {
    const car = await this.mileageCarsNewTestRep.findOne({
      where: {
        customIds: {
          avby: {
            carId,
          },
        },
      },
    });

    return car;
  }

  async delete(deleteCar: DeleteCar) {
    try {
      const { uuid } = deleteCar;

      await this.mileageCarsNewTestRep.destroy({
        where: {
          uuid,
        },
      });

      return 'OK';
    } catch (error) {
      return new HttpException('Ошибка при удалении', HttpStatus.BAD_REQUEST);
    }
  }
}
