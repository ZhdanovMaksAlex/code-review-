export interface ItemOrder {
  image: string;
  title: string;
  quantity: number;
  price: number;
  productRn: number;
  code: string;
}

export enum statusOrder {
  status1 = 'Заказ оплачен',
  status2 = 'Взят в работу',
  status3 = 'Новый заказ',
  status4 = 'Отменяем',
}

export enum typeOrder {
  order,
  purchases,
}

export enum cancellProcess {
  orderNotCancelled,
  orderCancelled,
}

export enum deliveryType {
  delivery1 = 'Самовывоз',
  delivery2 = 'Доставка',
  delivery3 = '',
}

export enum statusPay {
  pay1 = 'наличная оплата',
  pay2 = 'оплата картой',
  pay3 = 'кредит',
  pay4 = 'оплата',
}

export type orderType = {
  orderRn: number;
  orderNumber: string;
  orderStatus: statusOrder;
  payType: statusPay;
  address: string;
  cancellationProcess: number;
  deliveryType: deliveryType;
  orderDate: number;
  products: ItemOrder[];
  totalSumOrder: number;
  shopId: number;
  orderType: number;
};

export const orderStatusMap = {
  [statusOrder.status1]: 'Оплачен',
  [statusOrder.status2]: 'В работе',
  [statusOrder.status3]: 'Новый',
};

export const deliveryTypeMap = {
  [deliveryType.delivery1]: 'Самовывоз из',
  [deliveryType.delivery2]: 'Доставка на адрес',
  [deliveryType.delivery3]: '',
};

export const payTypeMap = {
  [statusPay.pay1]: 'Наличными при получении',
  [statusPay.pay2]: 'Оплата картой',
  [statusPay.pay3]: 'Кредит',
};

export enum orderCancell {
  termsSatisfactory = 'Не устроили сроки',
  alreadyBought = 'Уже купил(а) у вас',
  doughtAnotherCompany = 'Купил(а) в другой компании',
  errorSelection = 'Ошибка с выбором',
  problemsCreditPlan = 'Проблемы с кредитом/рассрочкой',
  priceSuit = 'Не устроила цена',
  aboutBuying = 'Передумал покупать',
}

export const orderTypeActual = [
  'DEADLINE',
  'ALREADY',
  'ANOTHER',
  'SELECTION_ERROR',
  'PROBLEM_CREDIT',
  'VERY_EXPENSIVE',
  'CHANGED_MY_MIND',
];

export interface UserOrderSchema {
  listPurchases: orderType[];
  listOrders: orderType[];
  isLoadedListOrder: boolean;
}
