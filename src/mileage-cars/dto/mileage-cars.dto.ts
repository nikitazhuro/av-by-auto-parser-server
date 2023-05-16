interface Ititle {
  brand: string;
  generation: string;
  image: string;
  model: string;
  year: number;
}

interface IMediumPrice {
  advertCount: number;
  mainFilter: any;
  maxPriceUsd: number;
  minPriceUsd: number;
  priceByn: number;
  priceUsd: number;
}

export interface IData {
  year: string;
  lastSoldCars: Array<any>;
  title: Ititle;
  mediumPrice: IMediumPrice;
}

export class CreateMileageCars {
  readonly brand: string;
  readonly model: string;
  readonly generation: string;
  readonly data: Array<IData>;
}

export class GetMileageCars {
  readonly brand: string;
  readonly model: string;
  readonly generation: string;
  readonly year?: string;
}

export class DeleteCar {
  readonly carId: number;
  readonly uuid: string;
}
const mockExample = {
  title: {
    brand: 'Skoda',
    model: 'Felicia',
    generation: 'I',
    year: 1994,
    image: 'https://avcdn.av.by/cargeneration/0000/0025/1519.jpeg',
  },
  mediumPrice: {
    priceUsd: 0,
    priceByn: 0,
    minPriceUsd: 0,
    maxPriceUsd: 0,
    advertCount: 0,
    mainFilter: {
      advertType: 'cars',
      filterType: 'main',
      initialValue:
        'brands[0][brand]=1126&brands[0][generation]=2245&brands[0][model]=1132&condition[0]=2&price_currency=2&year[max]=1994&year[min]=1994',
      url: 'https://cars.av.by/filter?brands[0][brand]=1126&brands[0][model]=1132&brands[0][generation]=2245&year[min]=1994&year[max]=1994&condition[0]=2',
    },
    statisticFilter: {
      advertType: 'cars',
      filterType: 'price-statistics',
      initialValue: 'brand=1126&generation=2245&model=1132&year=1994',
      url: 'https://av.by/ocenka-avto/skoda_felicia_i-1994-1998_1994',
    },
  },
  advertActivity: {
    last: { new: 0, removed: 0 },
    byMonth: [
      { date: '2022-11-01', new: 0, removed: 0 },
      { date: '2022-12-01', new: 0, removed: 0 },
      { date: '2023-01-01', new: 0, removed: 0 },
      { date: '2023-02-01', new: 0, removed: 0 },
      { date: '2023-03-01', new: 0, removed: 0 },
      { date: '2023-04-01', new: 0, removed: 0 },
    ],
  },
  borderedFilters: {
    next: {
      advertType: 'cars',
      filterType: 'price-statistics',
      initialValue: 'brand=1126&generation=2245&model=1132&year=1995',
      url: 'https://av.by/ocenka-avto/skoda_felicia_i-1994-1998_1995',
      year: 1995,
    },
  },
  lastSoldAdverts: [
    {
      id: 100067877,
      originalDaysOnSale: 30,
      advertType: 'cars',
      status: 'archived',
      publicStatus: { label: 'Продано', name: 'sold' },
      price: {
        usd: { currency: 'usd', amount: 699, amountFiat: 699 },
        byn: { currency: 'byn', amount: 2052, amountFiat: 2052.26 },
        rub: { currency: 'rub', amount: 57072, amountFiat: 57072.33 },
        eur: { currency: 'eur', amount: 633, amountFiat: 633.26 },
      },
      description:
        'Продаётся хороший не дорогой автомобиль 1.3 карбюратор, 1994г. 157000 родной пробег, машина очень мало эксплуатировалась. Новый аккумулятор. Торг. ',
      exchange: {
        type: 'without_exchange',
        label: 'Обмен не интересует',
        comment: '',
        exchangeAllowed: 'denied',
      },
      version: 1,
      publishedAt: '2020-11-05T10:49:34+0000',
      indexPromo: false,
      top: false,
      highlight: false,
      removeReason: 'sold_avby',
      videoUrl: '',
      videoUrlId: '',
      removedAt: '2020-12-04T12:48:47+0000',
      photos: [
        {
          id: 8303462,
          main: true,
          mimeType: 'image/jpeg',
          big: {
            width: 1400,
            height: 788,
            url: 'https://avcdn.av.by/advertbig/0000/0830/3463.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3464.jpeg',
          },
          small: {
            width: 360,
            height: 203,
            url: 'https://avcdn.av.by/advertpreview/0000/0830/3465.jpeg',
          },
          extrasmall: {
            width: 200,
            height: 113,
            url: 'https://avcdn.av.by/advertextrasmall/0000/0830/3466.jpeg',
          },
        },
        {
          id: 8303357,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3359.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3359.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3359.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3359.jpeg',
          },
        },
        {
          id: 8303367,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3369.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3369.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3369.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3369.jpeg',
          },
        },
        {
          id: 8303377,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3379.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3379.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3379.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3379.jpeg',
          },
        },
        {
          id: 8303382,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3384.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3384.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3384.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3384.jpeg',
          },
        },
        {
          id: 8303387,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3389.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3389.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3389.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3389.jpeg',
          },
        },
        {
          id: 8303397,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3399.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3399.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3399.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3399.jpeg',
          },
        },
        {
          id: 8303412,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3414.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3414.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3414.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3414.jpeg',
          },
        },
        {
          id: 8303432,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3434.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3434.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3434.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3434.jpeg',
          },
        },
        {
          id: 8303442,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3444.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3444.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3444.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3444.jpeg',
          },
        },
        {
          id: 8303452,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3454.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3454.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3454.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3454.jpeg',
          },
        },
        {
          id: 8303472,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3474.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3474.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3474.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3474.jpeg',
          },
        },
        {
          id: 8303477,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3479.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3479.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3479.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3479.jpeg',
          },
        },
        {
          id: 8303492,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3494.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3494.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3494.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3494.jpeg',
          },
        },
        {
          id: 8303497,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3499.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3499.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3499.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3499.jpeg',
          },
        },
        {
          id: 8303502,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3504.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3504.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3504.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3504.jpeg',
          },
        },
        {
          id: 8303507,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3509.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3509.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3509.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3509.jpeg',
          },
        },
        {
          id: 8303512,
          main: false,
          mimeType: 'image/jpeg',
          big: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3514.jpeg',
          },
          medium: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3514.jpeg',
          },
          small: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3514.jpeg',
          },
          extrasmall: {
            width: 612,
            height: 344,
            url: 'https://avcdn.av.by/advertmedium/0000/0830/3514.jpeg',
          },
        },
      ],
      sellerName: '',
      questionAllowed: false,
      locationName: 'Гродно',
      shortLocationName: 'Гродно',
      properties: [
        { value: 'Skoda', id: 113, name: 'brand', fallbackType: 'string' },
        { value: 'Felicia', id: 114, name: 'model', fallbackType: 'string' },
        { value: 'I', id: 115, name: 'generation', fallbackType: 'string' },
        { value: '1994', id: 117, name: 'year', fallbackType: 'string' },
        {
          value: '1.3',
          id: 124,
          name: 'engine_capacity',
          fallbackType: 'string',
        },
        {
          value: 'бензин',
          id: 125,
          name: 'engine_type',
          fallbackType: 'string',
        },
        {
          value: 'механика',
          id: 118,
          name: 'transmission_type',
          fallbackType: 'string',
        },
        {
          value: 'I (1994 - 1998)',
          id: 116,
          name: 'generation_with_years',
          fallbackType: 'string',
        },
        {
          value: 'светлый',
          id: 131,
          name: 'interior_color',
          fallbackType: 'string',
        },
        {
          value: 'ткань',
          id: 132,
          name: 'interior_material',
          fallbackType: 'string',
        },
        { value: true, id: 155, name: 'fog_lights', fallbackType: 'boolean' },
        {
          value: 'хэтчбек 5 дв.',
          id: 127,
          name: 'body_type',
          fallbackType: 'string',
        },
        {
          value: 'передний привод',
          id: 128,
          name: 'drive_type',
          fallbackType: 'string',
        },
        { value: 'синий', id: 129, name: 'color', fallbackType: 'string' },
        { value: 157000, id: 123, name: 'mileage_km', fallbackType: 'int' },
        {
          value: 'с пробегом',
          id: 126,
          name: 'condition',
          fallbackType: 'string',
        },
        { value: 699, id: 122, name: 'price_amount_usd', fallbackType: 'int' },
      ],
      publicUrl: 'https://cars.av.by/skoda/felicia/100067877',
      year: 1994,
      metadata: {
        condition: { id: 2, label: 'с пробегом' },
        brandId: 1126,
        brandSlug: 'skoda',
        modelId: 1132,
        modelSlug: 'felicia',
        generationId: 2245,
        year: 1994,
      },
      foreignIp: false,
    },
  ],
};

export class MileageCarFromAvTitle {
  readonly brand: string;
  readonly model: string;
  readonly generation: string;
  readonly year: number;
  readonly image: string;
}

export class ILastSoldMileageCarFromAv {
  readonly id: number;
  readonly originalDaysOnSale: number;
  readonly advertType: string;
  readonly status: string;
  readonly publicStatus: { label: string; name: string };
  readonly properties: Array<{
    value: string;
    id: number;
    name: string;
    fallbackType: string;
  }>;
  readonly photos: Array<{
    id: number;
    main: boolean;
    mimeType: string;
    big: {
      width: number;
      height: number;
      url: string;
    };
    medium: {
      width: number;
      height: number;
      url: string;
    };
    small: {
      width: number;
      height: number;
      url: string;
    };
    extrasmall: {
      width: number;
      height: number;
      url: string;
    };
  }>;
  readonly price: {
    usd: { currency: string; amount: number; amountFiat: number };
    byn: { currency: string; amount: number; amountFiat: number };
    rub: { currency: string; amount: number; amountFiat: number };
    eur: { currency: string; amount: number; amountFiat: number };
  };
  readonly exchange: {
    type: string;
    label: string;
    comment: string;
    exchangeAllowed: string;
  };
  readonly version: number;
  readonly publishedAt: string;
  readonly indexPromo: boolean;
  readonly top: boolean;
  readonly highlight: boolean;
  readonly removeReason: string;
  readonly removedAt: string;
  readonly description: string;
  readonly videoUrl: string;
  readonly videoUrlId: string;
  readonly sellerName: string;
  readonly questionAllowed: boolean;
  readonly locationName: string;
  readonly shortLocationName: string;
  readonly publicUrl: string;
  readonly year: number;
  readonly foreignIp: boolean;
  readonly metadata: {
    condition: { id: number; label: string };
    brandId: number;
    brandSlug: string;
    modelId: number;
    modelSlug: string;
    generationId: number;
    year: number;
  };
}

export class MileageCarFromAv {
  readonly title: MileageCarFromAvTitle;
  readonly lastSoldAdverts: Array<ILastSoldMileageCarFromAv>;
  readonly mediumPrice: {
    priceUsd: number;
    priceByn: number;
    minPriceUsd: number;
    maxPriceUsd: number;
    advertCount: number;
    mainFilter: {
      advertType: string;
      filterType: string;
      initialValue: string;
      url: string;
    };
    statisticFilter: {
      advertType: string;
      filterType: string;
      initialValue: string;
      url: string;
    };
  };
}
