import { Block } from '@ui-kit/Block';
import { useAppSelector } from '@redux/hooks';
import { DeliveryType } from '@entities/Delivery';
import { OrderSuccessShopBlock, ShopTypeProps } from '@entities/Shop';
import { ProductList } from './ProductList';
import { BlockPay } from './BlockPay';
import { BlockRecord } from './BlockRecord';

import styles from './InfoBlock.module.scss';
import { useWindowSizing } from '@hooks/useSizeWindow';

export const InfoBlock = (): JSX.Element => {
  const { id, price, payment, delivery, shop, items, paymentUrl } = useAppSelector(state => state.order.data.order);
  const region = useAppSelector(state => state.header.data.region);
  const redirectToPayment = useAppSelector(state => state.order.data.redirectToPayment);
  const isMobile = useWindowSizing(990);
  return (
    <div className={styles.Wrapper}>
      <Block className={styles.Block}>
        <div className={styles.Title}>
          Спасибо! Ваш заказ оформлен.
        </div>
        <div className={styles.TitleMobile}>
          Номер вашего заказа:<b>{id}</b>
        </div>
        <ProductList items={items} price={price} />
        {isMobile && (
          <div className={styles.mobileBlock}>
            <BlockPay
              noButton={payment.paymentPatternId === 1}
              namePay={payment?.name}
              redirectToPayment={redirectToPayment}
              hrefPayment={paymentUrl}
            />
            <BlockRecord price={price} />
          </div>
        )}
      </Block>
      {shop && delivery?.code === DeliveryType.Pickup && <OrderSuccessShopBlock shop={shop as unknown as ShopTypeProps} />}
      {delivery?.code !== DeliveryType.Pickup &&
        <Block className={styles.BlockDelivery}>
          <div className={styles.BlockDeliveryRow}>
            <div className={styles.Title}>Способ получения:</div>
            <div className={styles.Value}>{delivery.name}</div>
          </div>
          {[String(DeliveryType.CourierDelivery), String(DeliveryType.TK)].indexOf(delivery?.code) > -1 &&
            <div className={styles.BlockDeliveryRow}>
              <div className={styles.Title}>Телефон службы доставки:</div>
              <div className={styles.Value}>{region.ORDER_PHONE}</div>
            </div>}
        </Block>
      }
    </div>
  );
};
