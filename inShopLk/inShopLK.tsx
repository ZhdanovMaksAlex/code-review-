import IconCirclePower from '../icons/circle-power.svg';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchInShop } from '@features/inShop';
import { Button, ButtonThemes } from '@app/shared';
import { addZero } from '@app/shared/helpers/addZero';
import { useAppSelector } from '@app/redux/hooks';
import { getAuthUserData } from '@app/entities/Auth';
import { ServiceCookies } from '@services/ServiceCookies';

import styles from './inShopLk.module.scss';

const getFormatDate = (value: number) => {
  const timeStart = new Date().getTime();
  const timeEnd = new Date(value).getTime();

  const hourDiff = timeEnd - timeStart;
  const secDiff = hourDiff / 1000;
  const minDiff = hourDiff / 60 / 1000;
  const hDiff = hourDiff / 3600 / 1000;

  return {
    h: Math.floor(hDiff) % 24,
    m: Math.floor(minDiff - 60 * Math.floor(hDiff)) % 60,
    s: Math.floor(secDiff - 60 * Math.floor(minDiff - 60 * Math.floor(hDiff))) % 60,
  };
};

const cookieName = 'koleso_in_shop';

export const InShopLK = ({ className }: { className?: string }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [inShop, setInShop] = useState<boolean>(false);
  const [time, setTime] = useState<number>();
  const [formTime, setFormTime] = useState<{ h: number; m: number; s: number }>({ h: 4, m: 0, s: 0 });
  const user = useAppSelector(getAuthUserData);
  const route = useRouter();

  const handlerInShop = async() => {
    setIsFetching(true);
    if (!isFetching) {
      const res = await fetchInShop();
      if (res) {
        const time = new Date().getTime() + 4 * 60 * 60 * 1000;
        setTime(time);
        const timeCookies = new Date(time);
        ServiceCookies.set(`${cookieName}_${user.userId}`, time.toString(), {
          path: '/',
          expires: timeCookies,
        });
        setInShop(res);
        route.push('/personal/discount/');
      }
    }
    setIsFetching(false);
  };

  useEffect(() => {
    let timer;
    if (inShop) {
      timer = setInterval(() => {
        const timeValue = time;
        if (timeValue - 1000 > new Date().getTime()) {
          setFormTime(getFormatDate(timeValue - 1000));
          setTime(timeValue - 1000);
        } else {
          setInShop(false);
          setTime(null);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [inShop]);

  useEffect(() => {
    if (ServiceCookies.get(`${cookieName}_${user.userId}`)) {
      const time = parseInt(ServiceCookies.get(`${cookieName}_${user.userId}`));
      if (time) {
        setInShop(true);
        setTime(time);
        setFormTime(getFormatDate(time));
      }
    }
  }, []);

  return (
    <Button
      id="btn-personal-in-shop"
      className={classNames(
        styles.ButtonInShop,
        { [styles.InShop]: inShop },
        className
      )}
      themes={ButtonThemes.Clear}
      onClick={handlerInShop}
    >
      <IconCirclePower />
      <div className={styles.Content}>
        <span>{inShop ? 'Ваша дисконтная карта' : 'Активировать скидку в центре'}</span>
        <span>{inShop ? (`активирована на ${addZero(formTime?.h)} : ${addZero(formTime?.m)} : ${addZero(formTime?.s)}`
        ) : (
          <>
            по дисконтной карте на 4 часа
          </>
        )}
        </span>
      </div>
    </Button>
  );
};
