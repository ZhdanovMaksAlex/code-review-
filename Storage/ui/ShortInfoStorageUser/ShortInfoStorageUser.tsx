import { IconChevronRight } from '@koleso-icons';
import { Badge, SkeletonLoading, WrapperLk } from '@app/shared';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useWindowSizing } from '@hooks/useSizeWindow';
import { useCallback, useEffect } from 'react';
import { getIsLoadedListOx, getListOx, fetchListOx } from '@entities/Storage';
import { declensionFactory } from '@helpers/declension';
import { useRouter } from 'next/router';

import styles from './ShortInfoStorageUser.module.scss';

const storageValue = declensionFactory('комплект', 'комплекта', 'комплектов');

export const ShortInfoStorageUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const listUserOx = useAppSelector(getListOx);
  const isLoaded = useAppSelector(getIsLoadedListOx);
  const firstStorage = listUserOx?.length && listUserOx[0];
  const isMobile = useWindowSizing(990);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchListOx());
    }
  }, []);

  const handlerRoute = useCallback(async() => {
    await router.push('/personal/storage/');
  }, []);

  const handlerRouteMobile = useCallback(async() => {
    isMobile && await router.push('/personal/storage/');
  }, [isMobile]);

  if (!isLoaded) {
    return (
      <SkeletonLoading className={styles.WrapperSkeleton} width={'100%'} height={'100%'}/>
    );
  }

  if (isLoaded && !listUserOx?.length) {
    return (
      <WrapperLk className={styles.Wrapper} IsMobile={isMobile} onClick={handlerRouteMobile}>
        <div className={styles.Container}>
          <div className={styles.Title} onClick={handlerRoute}>
            Хранение колёс
            <IconChevronRight
              width={16}
              height={16}
            />
          </div>
          <div className={styles.StorageCategory}>Пока ничего нет на хранении</div>
        </div>
      </WrapperLk>
    );
  }

  return (
    <WrapperLk className={styles.Wrapper} IsMobile={isMobile} onClick={handlerRouteMobile}>
      <div className={styles.Container}>
        <div className={styles.Title} onClick={handlerRoute}>
          Хранение колёс
          <IconChevronRight
            width={16}
            height={16}
          />
        </div>
        <div className={styles.NumberStorage}>№ {firstStorage.partyCode}</div>
        <div className={styles.StorageDate}>до {firstStorage.dataEnd}</div>
        <div className={styles.StorageCategory}>{firstStorage.equipment} {firstStorage.quantity} шт.</div>
      </div>
      {listUserOx?.length > 1 &&
        <Badge className={styles.Badge} onClick={handlerRoute}>
        + {listUserOx?.length - 1}
          <span>{storageValue(listUserOx?.length - 1)}</span>
          <IconChevronRight
            width={16}
            height={16}
          />
        </Badge>
      }
    </WrapperLk>
  );
};
