import { declensionFactory } from '@helpers/declension';
import { Product } from '../Product';
import { ProductListTypeProps } from './TypeProps';
import { getPriceFormat } from '@app/shared/helpers';

import styles from './ProductList.module.scss';

export const ProductList = ({ items, price }: ProductListTypeProps): JSX.Element => {
  const value = declensionFactory('товар', 'товара', 'товаров');
  return (
    <div className={styles.Container}>
      <p className={styles.Title}>Вы заказали {items?.length + ' ' + value(items?.length || 0)}:</p>
      {items.map(item => <Product key={item.id} item={item}/>)}
      <div className={styles.Bottom}>
        <div>Итого: </div>
        <div className={styles.Price}>{getPriceFormat(price)} ₽ </div>
      </div>
    </div>
  );
};
