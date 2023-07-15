import { Op } from 'sequelize';
import { GetMileageCars } from '../dto/mileage-cars.dto';
import { isEmpty } from 'lodash';

export const createMileageCarsGetAllWhereConfig = (
  getMileageCars: GetMileageCars,
) => {
  const { filter, brand, model, generations, year } = getMileageCars;

  const whereConfig: any = {
    brandUUID: brand,
    modelUUID: model,
    generationUUID: {
      [Op.in]: generations,
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
      whereConfig.data.properties.engine_type.value[Op.in] = filter.engine_type;
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
      whereConfig.data.properties.mileage_km.value[Op.lte] = +filter.mileage_to;
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

  return whereConfig;
};
