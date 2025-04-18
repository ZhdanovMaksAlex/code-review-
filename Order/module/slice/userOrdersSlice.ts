import { createSlice } from '@reduxjs/toolkit';
import { fetchListOrder } from '@entities/Order';
import { UserOrderSchema, typeOrder } from '../types/userOrdersSchema';
import { sortOrdersRn } from '../helpers/orderSort';

const initialState: UserOrderSchema = {
  listOrders: [],
  listPurchases: [],
  isLoadedListOrder: false,
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListOrder.pending, (state) => {
      state.isLoadedListOrder = false;
    });
    builder.addCase(fetchListOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.listOrders = sortOrdersRn(action.payload.filter((x) => x.orderType === typeOrder.order));
        state.listPurchases = sortOrdersRn(action.payload.filter((x) => x.orderType === typeOrder.purchases));
      }
      state.isLoadedListOrder = true;
    });
    builder.addCase(fetchListOrder.rejected, (state) => {
      state.isLoadedListOrder = true;
    });
  },
});

export const { actions: userOrdersActions } = userOrdersSlice;
