import { handleResponse, MyAxios } from '@services/SettingAxios';
import { ServiceCookies } from '@services/ServiceCookies';
import { wrapperFetchCheckedValidateToken } from '@sharedHelpers/wrapperFetchCheckedValidateToken';
import { OrderCancel, ResponseCancelOrder } from './api.dto';

export const fetchCancelOrder = async(data: OrderCancel): Promise<ResponseCancelOrder> => {
  return await wrapperFetchCheckedValidateToken(async() => {
    return await MyAxios.post('api/user/orders/cancel', data, {
        headers: {
          [ServiceCookies.JWT_HEADER]: ServiceCookies.jwtAccess,
        },
      }).then(handleResponse);
  });
};
