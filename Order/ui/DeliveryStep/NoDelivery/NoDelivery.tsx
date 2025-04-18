import { useAppSelector } from '@redux/hooks';
import { LinkColors, MyLink } from '@app/shared';

import styles from './NoDelivery.module.scss';

const NoDelivery = () => {
  const { PHONE, FEDERAL_PHONE } = useAppSelector(state => state.header.data.region);
  return (
    <div className={styles.NoDelivery}>
      <div className={styles.TextInfo}>
        <div className={styles.Text}>Сейчас доставка не доступна.</div>
      </div>
      <MyLink className={styles.Phone} color={LinkColors.Violet} href={`tel:${PHONE || FEDERAL_PHONE}`}>
        Позвоните нам: {PHONE || FEDERAL_PHONE}
      </MyLink>
    </div>
  );
};

export default NoDelivery;
