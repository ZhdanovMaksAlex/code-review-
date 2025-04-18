import { RootState } from '@redux/store';

export const getPaymentResult = (state: RootState) => state.order.data.resultStep.stepPayment;
