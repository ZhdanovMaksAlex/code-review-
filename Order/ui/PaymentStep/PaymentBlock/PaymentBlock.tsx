import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getModelData, orderActions } from '@entities/Order';
import { PaymentBlockTypeProps } from './TypeProps';
import { BlockBorderAnimation as Block } from '@app/shared';
import { YandexPayOrder, YandexSplitOrder } from '@app/features/yandexPay';
import { ServiceEcommerce2 } from '@app/services/ServiceEcommerce';

import styles from './PaymentBlock.module.scss';

const customBlocks = {
  'yandex-pay': YandexPayOrder,
  'yandex-split': YandexSplitOrder,
};

export const PaymentBlock = ({ payment, dataAttribute }: PaymentBlockTypeProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const model = useAppSelector(getModelData);
  const { basket } = useAppSelector(state => state.basket.data);

  const handler = () => {
    ServiceEcommerce2.addPaymentInfo({
      payment_type: payment.name,
      items: basket.items
    });

    dispatch(orderActions.setModel({ key: 'payment', value: payment }));
    dispatch(orderActions.setResultStep({ key: 'stepPayment', value: payment }));
  };
  const activePayment = model?.payment?.id === payment.id;
  const CustomComponent = customBlocks[payment.code];
  return (
    <Block active={activePayment} fullHeight onClick={handler}>
      <div className={styles.Container}>
        {CustomComponent ? <CustomComponent payment={payment} selected={!!activePayment}/>
          : (
            <>
              <div className={styles.Image}>
                <Image
                  src={payment?.paymentPicture || ''}
                  alt={payment?.name}
                  width={76}
                  height={30}
                  layout='fixed'
                />
              </div>
              <div className={styles.Title} data-testid={dataAttribute}>
                {payment.name}
              </div>
            </>
          )}
      </div>
      {activePayment && <div className={styles.Description}>
        {payment?.announce}
      </div>}
    </Block>
  );
};
