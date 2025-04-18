export interface ApiDtoOneClickOrder {
  fio: string;
  comment: string;
  email: string;
  phone: string;
  regionId: number;
  shopId?: number;
  part?: number;
  productId?: number;
  price?: number;
  qty?: number;
}
