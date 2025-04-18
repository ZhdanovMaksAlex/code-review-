import { RootState } from '@redux/store';

export const getResultStepData = (state: RootState) => state.order.data.resultStep;
