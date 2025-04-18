import { useAppSelector } from '@redux/hooks';
import { AvailableString, AvailableType } from '@app/entities/Delivery';

import classNames from 'classnames';

import styles from './PickUpToday.module.scss';

export const PickUpToday = () => {
  const list = useAppSelector(state => state.order.data.availableShops);
  const available: AvailableType = (Object.values(list).sort()[0] || AvailableType.NoInfo);

  return (
    <>
      {list && available && (
        <div
          className={classNames(styles.Time,
            available < AvailableType.PickUpTomorrow && styles.pickGreen,
            available !== AvailableType.NoInfo && available >= AvailableType.PickUpTomorrow && styles.pickOrange,
            (!available || available === AvailableType.NoInfo) && styles.pickRed
          )}>
          {AvailableString[available]}
          {!(!available || available === AvailableType.NoInfo)}
        </div>
      )}
    </>
  );
};
