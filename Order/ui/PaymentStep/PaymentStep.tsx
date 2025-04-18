import { PaymentTypes } from '@app/Types/Order';
import { getPayment } from '@entities/Order';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useEffect } from 'react';
import { PaymentBlock } from './PaymentBlock';
import { ErrorBoundaryComponent } from '@app/shared/ui/ErrorBoundary';

import styles from './PaymentStep.module.scss';

const PaymentStep = () => {
  const dispatch = useAppDispatch();
  const { REGION } = useAppSelector((state) => state.header.data.region);
  const { id: deliveryId } = useAppSelector((state) => state.order.data.model.delivery);
  const { legalEntity } = useAppSelector((state) => state.order.data.model.infoUser);
  const shop = useAppSelector((state) => state.order.data.model.shop);
  const paymentList = useAppSelector((state) => state.order.data.paymentList);

  useEffect(() => {
    const query = {
      regionId: +REGION,
      deliveryId,
      shopId: shop?.id,
    };
    dispatch(getPayment(query));
  }, [deliveryId, shop]);

  return (
    <div className={styles.Container}>
      {paymentList
        ?.filter((payment) =>
          legalEntity
            ? payment.type === PaymentTypes.LegalEntity
            : payment.type === PaymentTypes.Any
        )
        .map((item) => (
          <ErrorBoundaryComponent key={item.id}>
            <PaymentBlock
              payment={item}
              dataAttribute={`type-payment-${item.id}`}
            />
          </ErrorBoundaryComponent>
        ))}
    </div>
  );
};

export default PaymentStep;
