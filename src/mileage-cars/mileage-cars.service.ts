import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DeleteCar, GetMileageCars } from './dto/mileage-cars.dto';
import { MileageCarsModel } from './mileage-cars.model';

@Injectable()
export class MileageCarsService {
  constructor(
    @InjectModel(MileageCarsModel)
    private mileageCarsRepository: typeof MileageCarsModel,
  ) {}

  async changeProperties() {
    const allCars = await this.mileageCarsRepository.findAll({
      include: {
        all: true,
      },
    });

    for (let i = 0; i < allCars.length; i++) {
      if (allCars[i].data.properties?.length) {
        const obj = {};

        allCars[i].data.properties?.forEach((prop) => {
          if (!obj[prop.name]) {
            obj[prop.name] = {
              value: prop.value,
              id: prop.id,
            };
          }
        });
        const newData = {
          ...allCars[i].data,
          properties: obj,
        };

        allCars[i].data = newData;

        await allCars[i].save();
      }
    }
  }

  async getAll(getMileageCars: GetMileageCars) {
    if (getMileageCars.year) {
      return this.mileageCarsRepository.findAll({
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

    return this.mileageCarsRepository.findAll({
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
    const car = await this.mileageCarsRepository.findOne({
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

      await this.mileageCarsRepository.destroy({
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
