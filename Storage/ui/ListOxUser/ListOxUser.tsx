import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { fetchListOx, storageActions } from '@entities/Storage';
import {
  AlertInfo,
  Badge,
  BadgeTheme,
  SkeletonLoading,
  TypeAlertInfo,
  Button,
  ButtonThemes,
} from '@app/shared';
import { useRouter } from 'next/router';
import { StorageType } from '../../module/types/storageSchema';
import { getIsLoadedListOx, getListOx } from '../../module/selectors/getListOx';
import { declensionFactory } from '@helpers/declension';
import { TitleList } from '@app/shared/ui/WrapperList/TitleList';
import { EmptyListStub } from '@app/shared/ui/EmptyListStub';
import { useWindowSizing } from '@hooks/useSizeWindow';
import { IconAuto, IconChevronDown } from '@koleso-icons';
import classNames from 'classnames';
import IconSummer from './img/summer.svg';
import IconWinter from './img/winter.svg';
import ImgStorage from './img/storage.png';

import styles from './ListOxUser.module.scss';

const value = declensionFactory('месяц', 'месяца', 'месяцев');

export const ListOxUser = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(getListOx);
  const isLoaded = useAppSelector(getIsLoadedListOx);
  const isMobile = useWindowSizing(990);
  const isTimeExpired = list.some((x) => x.isTimeExpired);

  useEffect(() => {
    if (!isLoaded && !list?.length) {
      dispatch(fetchListOx());
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <ListOxUser.Skeleton />;
  }

  if (isLoaded && !list.length) {
    return (
      <>
        <TitleList
          title="Хранение колёс"
          text={!!list.length && 'Сейчас на хранении'}
        />
        <EmptyListStub
          img={<Image src={ImgStorage} alt={'Пока ничего нет на хранении'} />}
          title="Пока ничего нет на хранении"
          text="Узнать всё о сезонном хранении в Колесо.ру, рассчитать стоимость услуги можно"
          showBtn={true}
          showBtnText="Подробнее о хранении колёс"
          idShowBtnText="btn-personal-sezonnoe-khranenie"
          href="/services/sezonnoe-khranenie"
          here="здесь"
        />
      </>
    );
  }

  if (isLoaded && isTimeExpired) {
    return (
      <>
        <TitleList
          title="Хранение колёс"
          text={!!list.length && 'Сейчас на хранении'}
        />
        <AlertInfo
          type={TypeAlertInfo.Error}
          className={styles.InfoNotification}>
          Срок хранения партии истёк. Просим вас забрать колёса. Не забудьте
          взять договор и акт приёма-передачи, удостоверяющий факт сдачи колёс
          на хранение.
        </AlertInfo>
        <div className={styles.Wrapper}>
          <div className={styles.Title}>Сейчас на хранении</div>
          {list.map((item) => (
            <ListOxUser.ItemOrder key={item.partyCode} {...item} />
          ))}
        </div>
        <AlertInfo
          type={TypeAlertInfo.Info}
          className={styles.InfoNotification}>
          Вы можете забрать колёса в любой момент, не дожидаясь окончания срока
          хранения. Не забудьте взять договор и акт приёма-передачи,
          удостоверяющий факт сдачи шин на хранение.
        </AlertInfo>
      </>
    );
  }

  return (
    <>
      <TitleList
        title="Хранение колёс"
        text={!!list.length && 'Сейчас на хранении'}/>
      {!isMobile && (
        <AlertInfo
          type={TypeAlertInfo.Info}
          className={styles.InfoNotification}>
          Вы можете забрать колёса в любой момент, не дожидаясь окончания срока
          хранения. Не забудьте взять договор и акт приёма-передачи,
          удостоверяющий факт сдачи шин на хранение.
        </AlertInfo>
      )}
      <div className={styles.Wrapper}>
        <div className={styles.Title}>Сейчас на хранении</div>
        {list.map((item) => (
          <ListOxUser.ItemOrder key={item.partyCode} {...item} />
        ))}
      </div>
      {isMobile && (
        <AlertInfo
          type={TypeAlertInfo.Info}
          className={styles.InfoNotification}>
          Вы можете забрать колёса в любой момент, не дожидаясь окончания срока
          хранения. Не забудьте взять договор и акт приёма-передачи,
          удостоверяющий факт сдачи шин на хранение.
        </AlertInfo>
      )}
    </>
  );
};

ListOxUser.ItemOrder = function ItemOrder(props: StorageType) {
  const {
    equipment,
    partyCode,
    tariff,
    quantity,
    dataStart,
    dataEnd,
    products,
    gtd,
    isTimeExpired,
  } = props;
  const dispatch = useAppDispatch();
  const [openPartComposition, setOpenPartComposition] = useState<boolean>(false);
  const route = useRouter();
  const isMobile = useWindowSizing(720);

  const handlerRecord = async() => {
    dispatch(storageActions.setRecordStorage(props));
    await route.push('/rec/?widgetOpened');
  };

  return (
    <div className={styles.Container}>
      <div
        className={classNames(styles.Header, {
          [styles.isTimeExpired]: isTimeExpired,
        })}>
        № партии {partyCode}
        {isTimeExpired && (
          <Badge className={styles.Badge} theme={BadgeTheme.Red}>
            Нужно забрать
          </Badge>
        )}
      </div>
      <div className={styles.Block}>
        <div className={styles.Column}>
          <div>Госномер: </div>
          <div className={styles.Info}>{gtd}</div>
        </div>
        <div className={styles.Column}>
          <div>Срок хранения: </div>
          <div className={classNames(styles.Info, styles.Flex)}>
            <span>{dataStart}</span>
            <span>-</span>
            <span>{dataEnd}</span>
          </div>
        </div>
        <div className={styles.Column}>
          <div>Тариф: </div>
          <div className={styles.Info}>
            {tariff} {value(Number(tariff))}
          </div>
        </div>
        <div className={styles.Column}>
          <div>Кол-во колёс: </div>
          <div className={styles.Info}>{quantity} шт.</div>
        </div>
        <div className={styles.Column}>
          <div>Комплектация: </div>
          <div className={styles.Info}>{equipment}</div>
        </div>
        <div
          className={styles.PartyComposition}
          onClick={() => setOpenPartComposition(!openPartComposition)}>
          <Badge>Состав партии</Badge>
          <IconChevronDown
            width={16}
            height={16}
            className={classNames(styles.IconDown, {
              [styles.Active]: openPartComposition,
            })}
          />
        </div>
        {openPartComposition && (
          <div className={styles.Column}>
            <div className={styles.Info}>
              {products?.map((product, index) => (
                <div className={styles.Product} key={product.title + index}>
                  <div className={styles.ProductTitle}>
                    {product.season ? <IconWinter /> : <IconSummer />}
                    {product.title}
                  </div>
                  {product.depth && (
                    <Badge
                      theme={BadgeTheme.GreenHack}
                      className={styles.Depth}>
                      глубина протектора {product.depth} мм
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.EvaluationInformation}>
        {!isMobile && <IconAuto width={40} height={30} />}
        <span>Привезти эту партию на шиномонтаж?</span>
        <Button onClick={handlerRecord} themes={ButtonThemes.DarkViolet}>Заказать и записаться</Button>
      </div>
    </div>
  );
};

ListOxUser.Skeleton = function Skeleton() {
  return (
    <div className={styles.Wrapper}>
      <SkeletonLoading width={'100%'} height={'83px'} />
      <SkeletonLoading width={'100%'} height={'83px'} />
      <SkeletonLoading width={'100%'} height={'83px'} />
      <SkeletonLoading width={'100%'} height={'83px'} />
      <SkeletonLoading width={'100%'} height={'83px'} />
    </div>
  );
};
