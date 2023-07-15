import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { DeleteCar, GetMileageCars } from './dto/mileage-cars.dto';
import { MileageCarsSchema } from './mileage-cars.schema';
import { GenerationSchema } from 'src/generation/generation.schema';
import { createMileageCarsGetAllWhereConfig } from './utils/mileageCarsGetAllHelper';

@Injectable()
export class MileageCarsService {
  constructor(
    @InjectModel(MileageCarsSchema)
    private mileageCarsRepository: typeof MileageCarsSchema,
    @InjectModel(GenerationSchema)
    private generationRepository: typeof GenerationSchema,
  ) {}

  async changeProperties() {
    const allCars = await this.mileageCarsRepository.findAll({
      include: {
        all: true,
      },
    });

    console.log(allCars);

    for (let i = 0; i < allCars.length; i++) {
      if (allCars[i].data.properties?.length) {
        const obj = {};
        console.log(i);

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

    return 'OK';
  }

  async addGeneration() {
    try {
      const cars = await this.mileageCarsRepository.findAll({
        include: { all: true },
      });

      for (let i = 0; i < cars.length; i++) {
        const genId = cars[i].customIds.avby.generationId;

        if (!cars[i].generationUUID) {
          const gen = await this.generationRepository.findOne({
            where: {
              customIds: {
                avby: genId,
              },
            },
          });

          cars[i].generationUUID = gen.uuid;
          await cars[i].save();
        }
      }
    } catch (error) {}
  }

  async getCount() {
    return this.mileageCarsRepository.count();
  }

  async getAll(getMileageCars: GetMileageCars) {
    const whereConfig = createMileageCarsGetAllWhereConfig(getMileageCars);

    return this.mileageCarsRepository.findAll({
      where: whereConfig,
    });
  }

  async getCarByUUID(uuid: string) {
    return this.mileageCarsRepository.findOne({
      where: { uuid },
      include: { all: true },
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
