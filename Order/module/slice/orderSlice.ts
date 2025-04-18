import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { OrderTypeState, infoUserTypes } from '../types/orderSchema';
import { DeliveryType as OrderDeliveryType, OrderDelivery, OrderPay } from '@app/Types/Order';
import { STEPS_ORDER, defaultModel } from '../const';
import { ServiceOrder, getPaymentTypes } from '@services/ServiceOrder';
import { getDeliveryTypePromise } from '@services/ServiceOrder/TypePromise';
import { deliveryStatus, RegionCheck, DeliveryType } from '@entities/Delivery';

const getStatusAvailableShops = async(shops, Api, regionId): Promise<Record<string, number>> => {
  try {
    if (!shops && RegionCheck(regionId)) {
      shops = {};
      const list = (Api.getState() as any).header.data.shopsList;
      for (let i = 0; i < list.length - 1; i++) {
        shops[list[i].id] = deliveryStatus[regionId];
      }
    }
    if (shops && RegionCheck(regionId)) {
      for (const key in shops) {
        shops[key] = deliveryStatus[regionId];
      }
    }
  } catch (error) {
    console.warn(error);
  }

  return shops;
};

export const getDeliveryOrder = createAsyncThunk('order/getDeliveryOrder',
  async(regionId: number, Api) => {
    const delivers = await ServiceOrder.getDelivery(regionId);
    const availability = await ServiceOrder.getAvailability(regionId);
    if (availability) {
      delivers.availableShops = await getStatusAvailableShops(availability.shops, Api, regionId);
      delivers.isOrderFromStock = availability.isOrderFromStock;
    }
    return delivers;
  });

export const getPayment = createAsyncThunk('order/getPayment',
  async(query: getPaymentTypes) => {
    return await ServiceOrder.getPayment(query);
  });

const initialState: OrderTypeState = {
  data: {
    order: null,
    redirectToPayment: false,
    deliveryList: [],
    paymentList: [],
    availableShops: null,
    model: defaultModel,
    defaultModel,
    resultStep: {
      stepDelivery: null,
      stepContacts: null,
      stepPayment: null,
    },
    shopList: [],
    activeShop: null,
    saveShopList: [],
    isLoadingDataEnrichment: true,
    isLoadingDelivery: false,
    isLoadedDelivery: false,
    isLoadingPayment: false,
    isOrderFromStock: null,
  }
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    dataEnrichment: (state, action: PayloadAction<any>) => {
      state.data.shopList = action.payload;
      state.data.saveShopList = action.payload;
      state.data.isLoadingDataEnrichment = false;
    },
    setRedirect: (state, action: PayloadAction<boolean>) => {
      state.data.redirectToPayment = action.payload;
    },
    setInitOrder: (state, action: PayloadAction<any>) => {
      state.data.order = action.payload;
    },
    setShopOrder: (state, action: PayloadAction<any>) => {
      state.data.order.shop = action.payload;
    },
    setDeliveryList: (state, action: PayloadAction<OrderDelivery>) => {
      state.data.deliveryList = action.payload.types;
    },
    nextStep: (state) => {
      let idx = STEPS_ORDER.indexOf(state.data.model.step);
      idx++;
      if (idx < STEPS_ORDER.length) {
        state.data.model.step = STEPS_ORDER[idx];
      }
    },
    setModel: (state, action: PayloadAction<any>) => {
      state.data.model[action.payload.key] = action.payload.value;
    },
    setResultStep: (state, action: PayloadAction<any>) => {
      state.data.resultStep[action.payload.key] = action.payload.value;
    },
    setContacts: (state, action: PayloadAction<infoUserTypes>) => {
      state.data.model.infoUser = action.payload;
    },
    setResetModel: (state) => {
      state.data.model = state.data.defaultModel;
    },
    setShopList: (state, action: PayloadAction<any>) => {
      if (state.data.shopList.length === 0 && state.data.isLoadingDataEnrichment) {
        state.data.shopList = action.payload;
        state.data.saveShopList = action.payload;
      }
      state.data.shopList = action.payload;
    },
    setActiveShop: (state, action: PayloadAction<any>) => {
      state.data.activeShop = action.payload;
    },
    setDelivery: (state, action: PayloadAction<OrderDeliveryType>) => {
      state.data.resultStep.stepPayment = null;
      state.data.model.payment = null;
      state.data.model.shop = null;
      if (action.payload.code === DeliveryType.Pickup && state.data.saveShopList.length === 1) {
        state.data.model.delivery = action.payload;
        state.data.model.shop = state.data.saveShopList[0];
        state.data.resultStep.stepDelivery = state.data.saveShopList[0];
        state.data.model.step = STEPS_ORDER[1];
      } else if (action.payload.code === DeliveryType.Pickup && state.data.saveShopList.length > 1) {
        state.data.model.delivery = action.payload;
      } else {
        state.data.model.delivery = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.order,
        };
      })
      .addCase(getPayment.pending, (state) => {
        console.log('загрузка списка оплат');
        state.data.isLoadingPayment = true;
      })
      .addCase(getPayment.fulfilled, (state, action: PayloadAction<OrderPay[]>) => {
        if (action.payload) {
          state.data.paymentList = action.payload;
          state.data.isLoadingPayment = false;
        }
      })
      .addCase(getDeliveryOrder.pending, (state) => {
        console.log('загрузка списка доставок');
        state.data.isLoadingDelivery = true;
      })
      .addCase(getDeliveryOrder.fulfilled, (state, action: PayloadAction<getDeliveryTypePromise>) => {
        if (action.payload) {
          state.data.deliveryList = action.payload.types;
          state.data.availableShops = action.payload.availableShops;
          state.data.isOrderFromStock = action.payload.isOrderFromStock || null;
          state.data.isLoadingDelivery = false;
          state.data.isLoadedDelivery = true;
        }
      });
  }
});

export const { actions: orderActions } = orderSlice;
