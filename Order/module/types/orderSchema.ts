import { IShopsMapModelExt, ShopsMapModelExt } from '@models/Header/IShopModel';
import { DeliveryType, isOrderFromStockType, OrderPay } from '@app/Types/Order';
import { ProductBasket } from '@app/Types/Basket';
import { AvailableType } from '@app/entities/Delivery';

export interface infoUserTypes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;
  inn?: string;
  nameOrganization?: string;
  addressOrganization?: string;
  bik?: string;
  checkingAccount?:string;
  kpp?: string;
  legalEntity?: boolean;
  consultation?: boolean;
  record?: boolean;
  seasonStorage?: boolean;
  offerTyreCovers?: boolean;
  agreement: boolean;
  receiveNotifications: boolean;
}

export interface OrderModelTypes {
  id?: number;
  step: string;
  description: string;
  payment: OrderPay;
  shop: ShopsMapModelExt;
  delivery: DeliveryType;
  infoUser: infoUserTypes
  address: string;
  addComment: string;
  fias: any;
  fiasId: string;
  offerAkb?: boolean;
  offerSecret?: boolean;
  offerWiper?: boolean;
  orderComment?: string;
  isValid?: boolean;
  legalEntity?: boolean;
}

export interface resultStep {
  stepDelivery: any;
  stepContacts: any;
  stepPayment: any;
}

export interface OrderType {
  id: number;
  delivery: DeliveryType;
  email: string;
  phone: string;
  name: string;
  payment: OrderPay;
  amount: number;
  price: number;
  items: ProductBasket[];
  shop: IShopsMapModelExt;
  paymentUrl: string;
  regionId: number;
  bill: string;
}

export interface availableShopsType {
  [shopId: number]: AvailableType
}

export interface OrderTypeState {
  data: {
    order: OrderType;
    redirectToPayment?: boolean;
    deliveryList: DeliveryType[];
    paymentList: OrderPay[];
    availableShops: availableShopsType;
    model: OrderModelTypes;
    defaultModel: OrderModelTypes;
    resultStep: resultStep;
    shopList: ShopsMapModelExt[];
    saveShopList: ShopsMapModelExt[];
    activeShop: NonNullable<IShopsMapModelExt>;
    isLoadingDataEnrichment: boolean;
    isLoadingDelivery: boolean;
    isLoadingPayment: boolean;
    isLoadedDelivery: boolean;
    isOrderFromStock?: isOrderFromStockType;
  }
}

export interface ActionModel {
  key: keyof OrderModelTypes;
  value: any;
}
