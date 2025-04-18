import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError, handleResponse, MyAxios } from '@services/SettingAxios';
import { wrapperFetchCheckedValidateToken } from '@sharedHelpers/wrapperFetchCheckedValidateToken';
import { ServiceCookies } from '@services/ServiceCookies';
import { StorageType } from '../types/storageSchema';

export const fetchListOx = createAsyncThunk<StorageType[], null>(
  'storage/fetchListOx',
  async() => {
    return await wrapperFetchCheckedValidateToken(async() => {
      return await MyAxios.get(
        '/api/user/ox',
        {
          headers: {
            [ServiceCookies.JWT_HEADER]: ServiceCookies.jwtAccess,
          },
        }
      )
        .then(handleResponse)
        .catch(handleError);
    });
  }
);
