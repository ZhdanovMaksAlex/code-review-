import { Order } from '../../types/orderType';
import { formatDiskSpec, formatTyreSpec, Part } from '@entities/Product';

export interface TypeDataOrder {
  id: number;
  billNumber: string;
  isShop: boolean;
  shopId: number;
  shopAddress: string;
  shopTimeWork: string;
  shopPhone: string;
  shopsCode: string;
  sumPrice: number;
  quantityToday?: number;
  statusDeliveryToday?: number;
  quantityNoToday?: number;
  statusDeliveryNoToday?: number;
  record?: boolean;
  products: Array<{
    id: number;
    part: number;
    price: number;
    quantity: number;
    name: string;
    size: string;
  }>;
}

export function getDataOrder(order: Order): TypeDataOrder {
  return {
    id: order.id,
    billNumber: order.order?.BILL_NUMB || '',
    isShop: !!order.order?.shop,
    shopAddress: order.order?.shop?.ADDRESS || '',
    shopId: order.order?.shop?.ID || null,
    shopTimeWork: order.order?.shop?.TIMEWORK || '',
    shopPhone: order.order?.shop?.PHONE || '',
    shopsCode: order.order?.shop?.CODE || '',
    quantityToday: order.order?.shop?.quantityToday,
    statusDeliveryToday: order.order?.shop?.statusDeliveryToday,
    quantityNoToday: order.order?.shop?.quantityNoToday,
    statusDeliveryNoToday: order.order?.shop?.statusDeliveryNoToday,
    record: order.order?.shop?.record,
    sumPrice: order.order.SUMM || null,
    products: order.order?.parts?.map((item) => {
      return {
        id: item.PRODUCT_ID,
        part: item.PART,
        price: item.PRICE || null,
        quantity: item.QUANTITY || null,
        name: item.NAME || '',
        size:
          (item.PART === Part.Tyres
            ? formatTyreSpec(item.product)
            : item.PART === Part.Disks
              ? formatDiskSpec(item.product)
              : null) || null,
      };
    }),
  };
}
