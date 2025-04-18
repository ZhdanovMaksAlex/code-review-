import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError, handleResponse, MyAxios } from '@services/SettingAxios';
import { ServiceCookies } from '@services/ServiceCookies';
import { orderType } from '../types/userOrdersSchema';
import { wrapperFetchCheckedValidateToken } from '@sharedHelpers/wrapperFetchCheckedValidateToken';

export const fetchListOrder = createAsyncThunk<orderType[]>(
  'userOrders/fetchListOrder',
  async() => {
    return await wrapperFetchCheckedValidateToken(async() => {
      return await MyAxios.get('/api/user/orders', {
        headers: {
          [ServiceCookies.JWT_HEADER]: ServiceCookies.jwtAccess,
        },
      })
        .then(handleResponse)
        .catch(handleError);
    });
  }
);
