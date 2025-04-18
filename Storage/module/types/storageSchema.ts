import { SeasonEnum } from '@entities/Product';

export type StorageType = {
  carMark?: string;
  carModel?: string;
  gtd?: string;
  partyCode: string;
  dataStart: string;
  dataEnd: string;
  tariff: string;
  quantity: number;
  equipment: string;
  products: Array<{
    season: SeasonEnum;
    title: string;
    depth: string;
    note: string;
  }>
  isTimeExpired?: boolean;
}

export type oxType = {
  dataend: string;
  datastart: string;
  name: number;
  number: number;
  quant: number;
  safemonth: number;
  season: string;
  typeService: string;
  value: (param: number) => string ;
};

export interface StorageSchema {
  recordStorage: StorageType;
  listOx: StorageType[];
  isLoadedListOx: boolean;
}
