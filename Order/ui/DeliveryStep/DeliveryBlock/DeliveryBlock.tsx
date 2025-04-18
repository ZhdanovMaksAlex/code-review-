import { orderActions } from '@entities/Order';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { setModalShopList } from '@redux/slices/modalWindow';
import { DeliveryBlockTypeProps } from './TypeProps';
import { PickUpToday } from './PickUpToday';
import { BlockBorderAnimation as Block } from '@app/shared';
import { useCallback } from 'react';
import { AvailableStringOrderFromStock, AvailableType, DeliveryType } from '@entities/Delivery';
import { ServiceEcommerce2 } from '@app/services/ServiceEcommerce';

import styles from './DeliveryStep.module.scss';

export const DeliveryBlock = ({ delivery }: DeliveryBlockTypeProps) => {
  const dispatch = useAppDispatch();
  const { model, saveShopList } = useAppSelector(state => state.order.data);
  const isOrderFromStock = useAppSelector(state => state.order.data.isOrderFromStock);
  const { basket } = useAppSelector(state => state.basket.data);

  const handlerClick = useCallback(() => {
    ServiceEcommerce2.addShippingInfo({
      shipping_tier: delivery.name,
      items: basket.items
    });
    dispatch(orderActions.setDelivery(delivery));
    if (delivery.code === DeliveryType.Pickup && saveShopList.length > 1) {
      setTimeout(() => {
        dispatch(setModalShopList(true));
      }, 200);
    }
  }, []);

  return (
    <Block active={model?.delivery?.id === delivery.id} onClick={handlerClick}>
      <div className={styles.Title} data-testid={`method-obtaining-${delivery.id}`}>
        {delivery?.name}
      </div>
      <div className={styles.Box}>
        {delivery.code === DeliveryType.Pickup && <PickUpToday />}
        {delivery.code === DeliveryType.CourierDelivery && <div className={styles.Time}>
          { isOrderFromStock && isOrderFromStock.type > AvailableType.PickUpTheDayAfterTomorrow
            ? `${AvailableStringOrderFromStock[isOrderFromStock.type]}`
            : '1-2 дня'
          }
        </div> }
        {delivery.code === DeliveryType.TK && <div className={styles.TimeTk}>3-10 дней, по тарифам ТК</div>}
      </div>
    </Block>
  );
};
