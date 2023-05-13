import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { MileageCarsModel } from './mileage-cars.model';
import { DeleteCar, GetMileageCars } from './dto/mileage-cars.dto';
import { MileageCarsNewTestModel } from './mileage-cars.model';
import axios from 'axios';

@Injectable()
export class MileageCarsService {
  constructor(
    @InjectModel(MileageCarsModel)
    private mileageCarsRepository: typeof MileageCarsModel,
    @InjectModel(MileageCarsNewTestModel)
    private mileageCarsNewTestRep: typeof MileageCarsNewTestModel,
  ) {}

  async qw() {
    const cars = await this.mileageCarsNewTestRep.findAll();

    for (let i = 0; i < cars.length; i++) {
      if (!cars[i].data.avbyPhotosLinks) {
        const car = await axios.get(`https://api.av.by/offers/${cars[i].customIds.avby.carId}`)

        const photosUrls = car.data.photos.map((photosObj) => {
          if (photosObj.medium) {
            return photosObj.medium.url;
          }
          if (photosObj.big) {
            return photosObj.big.url;
          }
          if (photosObj.small) {
            return photosObj.small.url;
          }
          if (photosObj.extrasmall) {
            return photosObj.extrasmall.url;
          }
        });
        cars[i].data = { ...cars[i].data, avbyPhotosLinks: photosUrls };

        await cars[i].save();
      }
    }

    console.log('COMPLETE PHOTOS');
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
