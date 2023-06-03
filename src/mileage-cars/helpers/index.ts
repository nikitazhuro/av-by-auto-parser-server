import { v4 } from 'uuid';

import { IMileageCar } from '../mileage-cars.model';
import { ILastSoldMileageCarFromAv, IProperty } from '../types';

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

export const createCarConfigHelper = ({
  brandUUID,
  modelUUID,
  genName,
  brandId,
  modelId,
  genId,
  year,
  lastSoldCar,
  photosUUIDs,
  photosUrls,
}): IMileageCar => {
  const createCarConfig = {
    uuid: v4(),
    brandUUID,
    modelUUID,
    generation: genName,
    customIds: {
      avby: {
        brandsId: brandId,
        modelId: modelId,
        generationId: genId,
        carId: lastSoldCar.id,
      },
    },
    year,
    mileage_km: findValueFromProps('mileage_km', lastSoldCar),
    photos: photosUUIDs,
    data: {
      avbyPhotosLinks: photosUrls,
      ...lastSoldCar,
      properties: prepareProperties(lastSoldCar.properties),
    },
  };

  delete createCarConfig.data.photos;

  return createCarConfig;
};
