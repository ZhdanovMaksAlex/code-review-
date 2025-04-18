import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { fetchListOrder } from '@entities/Order';
import { declensionFactory } from '@helpers/declension';
import {
  getIsLoadedListOrder,
  getListsOrder,
} from '../../module/selectors/getListOrders';
import { ItemOrderPurschases } from '../ItemOrderPurschases';

const valueOrder = declensionFactory('заказ', 'заказа', 'заказов');

export const ListOrdersUser = () => {
  const dispatch = useAppDispatch();
  const listOrders = useAppSelector(getListsOrder);
  const isLoaded = useAppSelector(getIsLoadedListOrder);

  useEffect(() => {
    if (!isLoaded && !listOrders?.length) {
      dispatch(fetchListOrder());
    }
  }, []);

  return (
    <ItemOrderPurschases
      data={listOrders}
      isLoaded={isLoaded}
      title="Мои заказы"
      text="Пока нет заказов, но это поправимо..."
      value={valueOrder}
    />
  );
};
