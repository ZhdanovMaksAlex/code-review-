import { RootState } from '@redux/store';

export const getInfoUser = (state: RootState) => state.order.data.model.infoUser;
