import { RootState } from '@redux/store';

export const getDeliveryResult = (state: RootState) => state.order.data.resultStep?.stepDelivery;
