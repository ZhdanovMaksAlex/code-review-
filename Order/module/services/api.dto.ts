export interface RegionIdDto {
  regionId: number;
}

export interface OrderCancel {
  number: number;
  formReason: string;
  desc: string;
}

export interface ResponseCancelOrder {
  code: number;
  result: string;
}
