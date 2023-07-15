export class Filter {
  readonly price_from: string;
  readonly price_to: string;
  readonly mileage_from: string;
  readonly mileage_to: string;
  readonly engine_from: string;
  readonly engine_to: string;
  readonly engine_type: string[];
  readonly transmission_type: string[];
  readonly body_type: string;
  readonly drive_type: string;
  readonly interior_material: string;
  readonly color: string;
  readonly year_from: string;
  readonly year_to: string;
}

export class GetMileageCars {
  readonly brand: string;
  readonly model: string;
  readonly generations: number[];
  readonly engine_capacity?: string;
  readonly year?: string;
  readonly filter?: Filter;
}

export class DeleteCar {
  readonly uuid: string;
}

export class FetchMileageCarsQuery {
  readonly brandUUID: string;
  readonly modelUUID?: string;
  readonly generationUUIDs?: string;
  readonly year?: string;
  readonly withPhotos: string;
}
