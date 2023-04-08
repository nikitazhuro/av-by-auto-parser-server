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
