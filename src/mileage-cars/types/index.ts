interface IMileageCarFromAvTitle {
  brand: string;
  model: string;
  generation: string;
  year: number;
  image: string;
}

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

export interface IGenerationFromAv {
  id: number;
  name: string;
  yearFrom: number;
  yearTo: number;
}

export interface IProperty {
  name: string;
  id: number;
  value: string;
  fallbackType: string;
}

export class ILastSoldMileageCarFromAv {
  readonly id: number;
  readonly originalDaysOnSale: number;
  readonly advertType: string;
  readonly status: string;
  readonly publicStatus: { label: string; name: string };
  readonly properties: Array<IProperty>;
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
  readonly title: IMileageCarFromAvTitle;
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

export interface IFetchMileageCarsForYearsFromAv {
  brandId: number;
  modelId: number;
  brandUUID: string;
  modelUUID: string;
  withPhotos: boolean;
  generation?: number;
}
