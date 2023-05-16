export class GetMileageCars {
  readonly brand: string;
  readonly model: string;
  readonly generation: string;
  readonly year?: string;
}

export class DeleteCar {
  readonly uuid: string;
}
