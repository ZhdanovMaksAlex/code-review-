import { useAppSelector } from '@redux/hooks';
import { OrderingButton } from '@entities/Order';

import styles from './ResultPayment.module.scss';

export const ResultPayment = (): JSX.Element => {
  const { payment } = useAppSelector(state => state.order.data.model);
  return (
    <div className={styles.Container}>
      <div>Вы выбрали способ оплаты: {payment.name}</div>
      <div className={styles.WrapperButton}>
        <OrderingButton />
      </div>
    </div>
  );
};
