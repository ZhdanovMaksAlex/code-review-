export interface Shop {
  ID: number;
  TITLE: string;
  REGION_CODE: string;
  REGION: string;
  NAME: string;
  CODE: string;
  ADDRESS: string;
  DETAIL_TEXT: string;
  ABOUT: string;
  EMAIL: string;
  EMAIL_ORDER: null;
  PHONE: string;
  PHONE_SMS: string;
  PHONE_MOUNT: string;
  PHONE_MESS: string;
  TIMEWORK: string;
  PROEZD: string;
  DEPARTMENT: string;
  DELIVERY: string;
  PICKUP: string;
  TERRITORY: string;
  IS_MICHELIN: string;
  PUBLIC: string;
  PARTNERS: number;
  EXTERNAL_ID: string;
  IBLOCK_ID: number;
  DELIVERY_DAYS_FROM: null;
  DELIVERY_DAYS_TO: null;
  SORT: number;
  ACTIVE: string;
  POSTS: number;
  NEW_ABOUT: string;
  PROIRITY_SLIDER: string;
  SHOP_ABOUT: string;
  quantityToday?: number;
  statusDeliveryToday?: number;
  quantityNoToday?: number;
  statusDeliveryNoToday?: number;
  record?: boolean;
}

export interface Product {
  rn: number;
  id: number;
  radius: number;
  width: number;
  height: number;
  speed: string;
  loads: string;
  price: number;
  part: number;
}

export interface Part {
  ID: number;
  ORDER_ID: number;
  NAME: string;
  PRODUCT_ID: number;
  PART: number;
  PRICE: number;
  QUANTITY: number;
  RESERV: number;
  SUMM: number;
  product: Product;
}

export interface OrderClass {
  ID: number;
  PERSON_ID: number;
  LOCATION: number;
  EMAIL: string;
  PHONE: string;
  ADDRESS: null;
  COMMENT: string;
  DELIVERY: number;
  SHOP_ID: number;
  PAYMENT: number;
  CDATE: number;
  BILL_NUMB: string;
  BILL_RN: string;
  SUMM: number;
  SOURCE_TRACK_ID: null;
  SOURCE_URL: null;
  DRIVER: null;
  DRIVER_PHONE: null;
  STATUS: number;
  shop: Shop;
  parts: Part[];
}

export interface Order {
  id: number;
  order: OrderClass;
  hash: string;
  status: string;
}
