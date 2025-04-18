import { RootState } from '@redux/store';

export const getModelData = (state: RootState) => state.order.data.model;
