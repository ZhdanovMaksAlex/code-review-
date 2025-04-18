import { phoneFormation, phoneFormationBack } from '@helpers/phoneFormation';
import { Button, ButtonSize, LinkColors, MyLink } from '@app/shared';
import { Price } from '@sharedComponents/Price';
import { TypeDataOrder } from '../../module/helpers/dataReductionOrder';
import { useAppSelector } from '@redux/hooks';
import { selectRegion } from '@redux/slices/header';
import { useEffect } from 'react';
import { quantityLimitation } from '@shared/helpers';
import { convertingSecondsToDeliveryStatus } from '@entities/Delivery';
import { RatingByShop } from '@entities/Shop';
import { useWindowSizing } from '@hooks/useSizeWindow';
import classNames from 'classnames';
import IconSafe from './icons/safe.svg';
import IconPhone from './icons/phone.svg';

import styles from './SuccessTemplate.module.scss';
import { InstallingYellowSlots } from '@helpers/installingYellowSlots';

export const SuccessTemplate = ({ orderData, className }: { orderData: TypeDataOrder, className?: string }) => {
  const { PHONE: phone, FEDERAL_PHONE: federalPhone, REGION: regionId } = useAppSelector(selectRegion);
  const isMobile = useWindowSizing(632);
  useEffect(() => {
    InstallingYellowSlots(orderData?.sumPrice, Number(regionId), orderData?.shopId);
  }, []);

  return (
    <div className={classNames(styles.WrapperSuccess, className)}>
      <div className={styles.WrapperProducts}>
        {orderData.products.map((product) => (
          <div className={styles.ProductContainer} key={product.name}>
            <div className={styles.ProductTitle}>
              {product.name}
            </div>
            <div className={styles.ProductQuantity}>
              {`${product.quantity} x `}
              <Price className={styles.PriceValue} amount={product.price} noCurrency/>
              {' ₽/шт.'}
            </div>
          </div>
        ))}
        <div className={styles.OrderPrice}>
          <span>Итого: </span>
          <Price className={styles.PriceValue} amount={orderData.sumPrice} />
        </div>
      </div>
      <div className={styles.InfoSafeBlock}>
        <IconSafe/>
        Сохраним товар и цену на 3 дня
      </div>
      <div className={styles.InfoTextDetails}>
        В ближайшее время наш сотрудник позвонит вам и уточнит все детали.
      </div>
      <MyLink href={`tel:${phoneFormationBack(federalPhone || phone)}`}>
        <div className={styles.InfoPhoneBlock}>
          <IconPhone className={styles.IconPhone}/>
          <div className={styles.LinkPhone}>{federalPhone}</div>
          <div className={styles.InfoPhoneText}>{isMobile ? 'Службы поддержки' : 'Единый номер службы поддержки'}</div>
        </div>
      </MyLink>
      {orderData.isShop
        ? (
          <div className={styles.WrapperShop}>
            <div className={styles.Title}>Ваш заказ будет ждать вас:</div>
            <div className={styles.ShopDetails}>
              <div className={styles.Row}>
                <MyLink
                  className={styles.Address}
                  href={orderData.shopsCode ? `/shops/${orderData.shopsCode}` : '/how_to_order'}
                  color={LinkColors.Black}
                >
                  {orderData.shopAddress}
                </MyLink>
                {orderData.shopPhone && (
                  <MyLink
                    className={styles.Phone}
                    color={LinkColors.Black}
                    href={`tel:${phoneFormationBack(orderData.shopPhone)}`}
                  >
                    {phoneFormation(orderData.shopPhone)?.phone}
                  </MyLink>
                )}
              </div>
              <RatingByShop className={styles.Rating} shopId={orderData.shopId}/>
              <div className={styles.Wrapper}>
                <div className={styles.Schedule}>
                  <div dangerouslySetInnerHTML={{ __html: orderData.shopTimeWork }}></div>
                </div>
              </div>
              <div className={styles.WrapperBottomBlock}>
                <div className={styles.InfoContainer}>
                  {orderData.quantityToday ? (
                    <div className={styles.statusDeliveryToday}>
                      {quantityLimitation(orderData.quantityToday)} шт. {convertingSecondsToDeliveryStatus(orderData.statusDeliveryToday)}
                    </div>
                  ) : (
                    <div className={styles.statusDeliveryNoToday}>
                      {quantityLimitation(orderData.quantityNoToday)} шт. {convertingSecondsToDeliveryStatus(orderData.statusDeliveryNoToday)}
                    </div>
                  )}
                  {orderData.record &&
                    <div className={styles.RecordRow}>Шиномонтаж сегодня / завтра</div>
                  }
                </div>
                <div className={styles.MakeAppointment}>
                  <MyLink href={`/rec/?widgetOpened&presetShopId=${orderData.shopId}`}>
                    <Button size={ButtonSize.L}>
                      Записаться на шиномонтаж
                    </Button>
                  </MyLink>
                </div>
              </div>
            </div>
          </div>
        )
        : (
          <div className={styles.MakeAppointment}>
            <MyLink href={'/rec/?widgetOpened'}>
              <Button size={ButtonSize.L}>
                Записаться на шиномонтаж
              </Button>
            </MyLink>
          </div>
        )
      }
    </div>
  );
};
