import { v4 } from 'uuid';

import { IMileageCar } from '../mileage-cars.schema';
import {
  ICreateCarConfig,
  ILastSoldMileageCarFromAv,
  IProperty,
} from '../types';

export const getPhotosUrlsFromLastSoldAvCar = (
  lastSoldCar: ILastSoldMileageCarFromAv,
) => {
  return lastSoldCar.photos.map((photosObj) => {
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
};

export const findValueFromProps = (
  key: string,
  lastSoldCar: ILastSoldMileageCarFromAv,
) => {
  return lastSoldCar.properties.find((prop) => prop.name === key).value;
};

const prepareProperties = (oldProps: Array<IProperty>) => {
  const resultProps = {};

  oldProps.forEach((prop) => {
    if (!resultProps[prop.name]) {
      resultProps[prop.name] = {
        value: prop.value,
        id: prop.id,
      };
    }
  });

  return resultProps;
};

export const createCarConfigHelper = (
  config: ICreateCarConfig,
): IMileageCar => {
  const createCarConfig = {
    uuid: v4(),
    brandUUID: config.brandUUID,
    modelUUID: config.modelUUID,
    generationUUID: config.genUUID,
    customIds: {
      avby: {
        brandsId: config.brandId,
        modelId: config.modelId,
        generationId: config.genId,
        carId: config.lastSoldCar.id,
      },
    },
    year: config.year,
    mileage_km: findValueFromProps('mileage_km', config.lastSoldCar),
    photos: config.photosUUIDs,
    data: {
      avbyPhotosLinks: config.photosUrls,
      ...config.lastSoldCar,
      properties: prepareProperties(config.lastSoldCar.properties),
    },
  };

  delete createCarConfig.data.photos;

  return createCarConfig;
};
