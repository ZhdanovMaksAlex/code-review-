import { useAppSelector } from '@redux/hooks';

import styles from './ResultContacts.module.scss';

export const ResultContacts = (): JSX.Element => {
  const infoUser = useAppSelector(state => state.order.data.model.infoUser);
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.BlockInfo}>
          <p><span>Имя:</span>{infoUser.lastName} {infoUser.firstName}</p>
          <p><span>Телефон:</span>{infoUser.phone}</p>
          <p><span>Почта:</span>{infoUser.email}</p>
        </div>

        {infoUser.legalEntity &&
          <div className={styles.legalEntity}>
            <p><span>ИНН:</span>{infoUser.inn}</p>
            <p><span>БИК:</span>{infoUser.bik}</p>
            <p><span>КПП:</span>{infoUser.kpp}</p>
            <p><span>Название организации:</span>{infoUser.nameOrganization}</p>
            <p><span>Юридический адрес организации:</span>{infoUser.addressOrganization}</p>
            <p><span>Расчетный счет:</span>{infoUser.checkingAccount}</p>
          </div>
        }
      </div>
    </div>
  );
};
