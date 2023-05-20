export class GetMileageCars {
  readonly brand: string;
  readonly model: string;
  readonly generation: string;
  readonly year?: string;
}

export class DeleteCar {
  readonly uuid: string;
}

export class FetchMileageCarsQuery {
  readonly brand?: string;
  readonly model?: string;
  readonly generation?: string;
  readonly year?: string;
  readonly withPhotos: string;
}
