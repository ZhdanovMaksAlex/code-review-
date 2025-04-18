import { RootState } from '@redux/store';

export const getListsOrder = (state: RootState) => state.userOrders.listOrders;
export const getListsPurchases = (state: RootState) => state.userOrders.listPurchases;
export const getIsLoadedListOrder = (state: RootState) => state.userOrders.isLoadedListOrder;
