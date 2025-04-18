import { Block } from '@ui-kit/Block';
import { MyLink } from '@ui-kit/MyLink';
import { Button } from '@ui-kit/MyButton';

import styles from './BlockPay.module.scss';

export const BlockPay = (
  {
    namePay,
    redirectToPayment,
    hrefPayment,
    noButton = false
  }: {
    namePay: string,
    redirectToPayment: boolean,
    hrefPayment?: string,
    noButton?: boolean
  }) => {
  return (
    <Block className={styles.Wrapper}>
      <div className={styles.Title}>Вы выбрали:</div>
      <div className={styles.Value}>{namePay}</div>
      {!redirectToPayment && hrefPayment && !noButton && <MyLink href={hrefPayment}>
        <Button fullWith>
          Перейти к оплате
        </Button>
      </MyLink> }
    </Block>
  );
};
