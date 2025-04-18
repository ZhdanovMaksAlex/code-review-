import { CheckBox } from '@ui-kit/MyCheckBox';
import { PropsCheckoutBox } from './PropsCheckoutBox';
import IconInfo from './info.svg';
import { checkAtribute } from '@app/entities/Product/module/helper/checkAtribute';

import styles from './CheckoutBox.module.scss';

export const CheckoutBox = ({ array, id }: { array: PropsCheckoutBox[], id?: string }): JSX.Element => {
  const onItemChange = (item: PropsCheckoutBox) => item.onChange({ key: item?.id, value: item?.checked ? '' : '1' });
  return (
    <div className={styles.Container}>
      {array.map(item => (
        <div key={item.id + id} className={styles.Item}>
          <CheckBox
            data-testid={checkAtribute(item.title)}
            checked={item.checked}
            onChange={() => onItemChange(item)}
            id={item.id + id}>
            {item.title}
          </CheckBox>
          {item?.tips && <IconInfo onClick={item.tips} width={16} height={16} data-testid={`legend-checkBox-${item.id}`}/>}
        </div>
      ))}
    </div>
  );
};
