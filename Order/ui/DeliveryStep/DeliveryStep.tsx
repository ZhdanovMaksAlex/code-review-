import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { SkeletonBLock } from '@sharedComponents/SkeletBlock';
import { DeliveryType } from '@entities/Delivery';
import {
  orderActions,
  getDeliveryOrder,
  getDeliveryList,
  getModelData,
  getResultStepData
} from '@entities/Order';
import { FormDelivery } from '@app/entities';
import { DeliveryBlock } from './DeliveryBlock';
import { useEffect } from 'react';
import { getAllShops } from '@redux/slices/header';
import { sortDelivery } from '@helpers/Sort';
import { NoDelivery } from './NoDelivery';

import styles from './DeliveryStep.module.scss';

export const DeliveryStep = (): JSX.Element => {
  const list = useAppSelector(getDeliveryList);
  const dispatch = useAppDispatch();
  const deliveryList = useAppSelector(state => state.order.data.deliveryList);
  const region = useAppSelector(state => state.header.data.region);
  const isLoadingDelivery = useAppSelector(state => state.order.data.isLoadingDelivery);
  const isLoadedDelivery = useAppSelector(state => state.order.data.isLoadedDelivery);
  const { delivery } = useAppSelector(getModelData);
  const { stepDelivery } = useAppSelector(getResultStepData);
  const shops = useAppSelector(getAllShops);

  useEffect(() => {
    if (!deliveryList.length && !isLoadedDelivery) {
      dispatch(getDeliveryOrder(+region?.REGION || 1));
      dispatch(orderActions.setShopList(shops));
    }
  }, []);
  return (
    <div>
      <div className={styles.Container}>
        { isLoadingDelivery
          ? [1, 2, 3].map((_, index) => <SkeletonBLock key={index} className={styles.Loader}/>)
          : [...list]
            ?.sort(sortDelivery)
            ?.map((item) => <DeliveryBlock key={item.id} delivery={item}/>)
        }
      </div>
      { isLoadedDelivery && !list.length && <NoDelivery/>}
      { !stepDelivery && delivery && delivery.code !== DeliveryType.Pickup && <FormDelivery /> }
    </div>
  );
};
