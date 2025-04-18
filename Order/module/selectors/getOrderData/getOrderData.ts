import { RootState } from '@redux/store';

export const getOrderData = (state: RootState) => state.order.data;
