import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { declensionFactory } from '@helpers/declension';
import {
  getIsLoadedListOrder,
  getListsPurchases,
} from '../../module/selectors/getListOrders';
import { ItemOrderPurschases } from '../ItemOrderPurschases';

import { fetchListOrder } from '@entities/Order';

const valuePurchase = declensionFactory('покупка', 'покупки', 'покупок');

export const ListPurchasesUser = () => {
  const dispatch = useAppDispatch();
  const listPurchase = useAppSelector(getListsPurchases);
  const isLoaded = useAppSelector(getIsLoadedListOrder);

  useEffect(() => {
    if (!isLoaded && !listPurchase?.length) {
      dispatch(fetchListOrder());
    }
  }, []);

  return (
    <ItemOrderPurschases
      data={listPurchase}
      isLoaded={isLoaded}
      title="Мои покупки"
      text="Пока нет покупок, но это поправимо..."
      value={valuePurchase}
    />
  );
};
