import { getPriceFormat } from '@app/shared/helpers';
import { ProductBasket } from '@app/Types/Basket';

import styles from './Product.module.scss';

export const Product = ({ item }: {item: ProductBasket}) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Name}>
        {item?.name}
        <div className={styles.Info}>
          {item.description}
        </div>
      </div>
      <div className={styles.Qnt}>{item.quantity} шт</div>
      <div className={styles.Price}>{getPriceFormat(item.specPrice * item.quantity)} ₽</div>
    </div>
  );
};
