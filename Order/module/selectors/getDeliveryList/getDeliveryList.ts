import { RootState } from '@redux/store';

export const getDeliveryList = (state: RootState) => state.order.data.deliveryList;
