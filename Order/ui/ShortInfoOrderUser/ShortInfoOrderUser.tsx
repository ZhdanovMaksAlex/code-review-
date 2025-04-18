import { useCallback } from 'react';
import { useAppSelector } from '@redux/hooks';
import { getIsLoadedListOrder, getListsOrder } from '@entities/Order';
import { Badge, Button, ButtonSize, ButtonThemes, MyLink, SkeletonLoading, WrapperLk } from '@app/shared';
import { declensionFactory } from '@helpers/declension';
import { getPriceFormat } from '@shared/helpers';
import { useWindowSizing } from '@hooks/useSizeWindow';
import { IconChevronRight } from '@koleso-icons';
import { useRouter } from 'next/router';

import styles from './ShortInfoOrderUser.module.scss';

const orderValue = declensionFactory('заказ', 'заказа', 'заказов');

export const ShortInfoOrderUser = () => {
  const router = useRouter();
  const listUserOrder = useAppSelector(getListsOrder);
  const isLoaded = useAppSelector(getIsLoadedListOrder);
  const lastOrder = listUserOrder?.length && listUserOrder[0];
  const isMobile = useWindowSizing(990);

  const handlerRoute = useCallback(async() => {
    await router.push('/personal/orders/');
  }, []);

  const handlerRouteMobile = useCallback(async() => {
    isMobile && await router.push('/personal/orders/');
  }, [isMobile]);

  if (!isLoaded) {
    return (
      <SkeletonLoading className={styles.WrapperSkeleton} width={'100%'} height={'100%'}/>
    );
  }

  if (isLoaded && !listUserOrder?.length) {
    return (
      <WrapperLk className={styles.Wrapper} IsMobile={isMobile} onClick={handlerRouteMobile}>
        <div className={styles.Container}>
          <div className={styles.Title} onClick={handlerRoute}>
            Мои заказы
            <IconChevronRight
              width={16}
              height={16}
            />
          </div>
          <div className={styles.OrderPrice}>Пока не было заказов</div>
        </div>
        <MyLink href={'/catalog/'}>
          <Button size={ButtonSize.S} themes={ButtonThemes.DarkViolet}>
            За покупками
          </Button>
        </MyLink>
      </WrapperLk>
    );
  }

  return (
    <WrapperLk className={styles.Wrapper} IsMobile={isMobile} onClick={handlerRouteMobile}>
      <div className={styles.Container}>
        <div className={styles.Title} onClick={handlerRoute}>
          Мои заказы
          <IconChevronRight
            width={16}
            height={16}
          />
        </div>
        <div className={styles.NumberOrder}>№ {lastOrder.orderNumber}</div>
        <div className={styles.OrderDate}>от {lastOrder.orderDate}</div>
        <div className={styles.OrderPrice}>на сумму {getPriceFormat(lastOrder.totalSumOrder)} ₽</div>
      </div>
      {listUserOrder?.length > 1 &&
        <Badge className={styles.Badge} onClick={handlerRoute}>
        +{listUserOrder?.length - 1}
          <span>{orderValue(listUserOrder?.length - 1)}</span>
          <IconChevronRight
            width={16}
            height={16}
          />
        </Badge>
      }
    </WrapperLk>
  );
};
