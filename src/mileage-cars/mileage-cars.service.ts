import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { DeleteCar, GetMileageCars } from './dto/mileage-cars.dto';
import { MileageCarsModel } from './mileage-cars.model';
import { isEmpty } from 'lodash';

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
    const { filter, brand, model, generation, year } = getMileageCars;

    const whereConfig: any = {
      customIds: {
        avby: {
          brandsId: brand,
          modelId: model,
          generationId: generation,
        },
      },
      data: {
        properties: {
          mileage_km: {
            value: {},
          },
          engine_capacity: {
            value: {},
          },
          engine_type: {
            value: {},
          },
          transmission_type: {},
          body_type: {
            value: {},
          },
          drive_type: {
            value: {},
          },
        },
        price: {
          usd: {
            amount: {},
          },
        },
      },
    };

    if (filter) {
      if (filter.year_from && !filter.year_to) {
        whereConfig.year = {
          [Op.gte]: +filter.year_from,
        };
      }
      if (!filter.year_from && filter.year_to) {
        whereConfig.year = {
          [Op.lte]: +filter.year_to,
        };
      }
      if (filter.year_from && filter.year_to) {
        whereConfig.year = {
          [Op.gte]: +filter.year_from,
          [Op.lte]: +filter.year_to,
        };
      }

      if (!isEmpty(filter.engine_type)) {
        whereConfig.data.properties.engine_type.value[Op.in] =
          filter.engine_type;
      }

      if (filter.transmission_type) {
        whereConfig.data.properties.transmission_type.value =
          filter.transmission_type;
      }

      if (!isEmpty(filter.body_type)) {
        whereConfig.data.properties.body_type.value[Op.in] = filter.body_type;
      }

      if (!isEmpty(filter.drive_type)) {
        whereConfig.data.properties.drive_type.value[Op.in] = filter.drive_type;
      }

      if (filter.price_from) {
        whereConfig.data.price.usd.amount[Op.gte] = +filter.price_from;
      }
      if (filter.price_to) {
        whereConfig.data.price.usd.amount[Op.lte] = +filter.price_to;
      }

      if (filter.mileage_from) {
        whereConfig.data.properties.mileage_km.value[Op.gte] =
          +filter.mileage_from;
      }
      if (filter.mileage_to) {
        whereConfig.data.properties.mileage_km.value[Op.lte] =
          +filter.mileage_to;
      }

      if (filter.engine_from) {
        whereConfig.data.properties.engine_capacity.value[Op.gte] =
          filter.engine_from;
      }
      if (filter.engine_to) {
        whereConfig.data.properties.engine_capacity.value[Op.lte] =
          filter.engine_to;
      }
    }

    if (!isEmpty(whereConfig.year) && year) {
      whereConfig.year = year;
    }

    return this.mileageCarsRepository.findAll({
      where: whereConfig,
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
