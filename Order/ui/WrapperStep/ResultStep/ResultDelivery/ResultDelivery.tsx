import { useAppSelector } from '@app/redux/hooks';
import { titleDelivery, DeliveryType } from '@entities/Delivery';

import styles from './ResultDelivery.module.scss';

export const ResultDelivery = (): JSX.Element => {
  const delivery = useAppSelector(state => state.order.data.model.delivery);
  const shop = useAppSelector(state => state.order.data.model.shop);
  const { address, addComment } = useAppSelector(state => state.order.data.model);
  return (
    <div className={styles.Container}>
      <div className={styles.Delivery}>
        {titleDelivery[delivery.code]}:
      </div>
      <div className={styles.Text}>
        {delivery.code === DeliveryType.Pickup && shop
          ? <ResShop address={shop.address} available={shop.available}/>
          : address + ' ' + addComment }
      </div>
    </div>
  );
};

const ResShop = ({ address, available }) => {
  return (
    <div>
      {address}<br/>
    </div>
  );
};
