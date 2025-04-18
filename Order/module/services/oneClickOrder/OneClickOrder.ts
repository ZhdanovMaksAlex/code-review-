import { ApiDtoOneClickOrder } from './api.dto';
import { Order } from '../../types/orderType';
import { handleResponse, MyAxios, priorityHandleError } from '@services/SettingAxios';

export const OneClickOrder = (query: ApiDtoOneClickOrder): Promise<Order> => {
  return MyAxios.post('/api/order/1click', { ...query })
    .then(handleResponse)
    .catch(priorityHandleError);
};
