import Image from 'next/image';
import ImageNullOrder from './img/nullOrder.png';
import classNames from 'classnames';
import { useState } from 'react';
import { LinkColors, MyLink, SkeletonLoading, Badge, BadgeTheme, Button, ButtonThemes, ButtonSize, FormField } from '@app/shared';
import { IconChevronDown } from '@koleso-icons';
import { getPriceFormat } from '@app/shared/helpers';
import { TitleList } from '@app/shared/ui/WrapperList/TitleList';
import { useWindowSizing } from '@app/hooks/useSizeWindow';
import { EmptyListStub } from '@app/shared/ui/EmptyListStub';
import { ModalWindow } from '@app/shared/ui/ModalWindow';
import { RadioButton } from '@ui-kit/RadioButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaFormOrderCancelComment } from '@helpers/validationForm';
import { fetchCancelOrder } from '@entities/Order';
import {
  orderCancell,
  deliveryTypeMap,
  ItemOrder,
  orderType,
  deliveryType,
  cancellProcess,
  statusOrder,
  typeOrder,
  orderTypeActual
} from '@entities/Order/module/types/userOrdersSchema';
import { BuildRoute } from '@entities/Shop';

import styles from './ItemOrderPurschases.module.scss';

export const ItemOrderPurschases = ({ data, isLoaded, title, text, value }) => {
  if (!isLoaded) {
    return <ItemOrderPurschases.Skeleton />;
  }

  if (isLoaded && (!Array.isArray(data) || !data.length)) {
    return (
      <>
        <TitleList title={title}/>
        <EmptyListStub
          title={text}
          textBtn='За покупками!'
          idTextBtn='btn-personal-go-shopping'
          img={<Image src={ImageNullOrder} alt={text}/>}
          href='/catalog'
          className={styles.OrderStub}
        />
      </>
    );
  }

  return (
    <>
      <TitleList title={title}/>
      <div className={styles.Wrapper}>
        <div className={styles.Title}>{data.length} {value(data.length)}</div>
        {data.map((item) => (
          <ItemOrderPurschases.ItemOrder
            key={item.orderNumber}
            order={item}
          />
        ))}
      </div>
    </>
  );
};

ItemOrderPurschases.ItemOrder = function ItemOrder({ order }: { order: orderType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const isMobile = useWindowSizing(990);

  const { products, orderNumber, orderDate, totalSumOrder, address, shopId, cancellationProcess, orderType, orderRn } = order;

  const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schemaFormOrderCancelComment),
    mode: 'onChange',
    defaultValues: {
      number: orderRn,
      formReason: '',
      desc: ''
    },
  });

  const watchAllFields = watch();

  const onSubmit = async(data) => {
    const response = await fetchCancelOrder(data);
    if (response) {
      const { code } = response;
      if (!code) {
        setShowSuccess(true);
      }
    } else {
      console.error('Error cancelling order');
    }
  };

  return (
    <div className={classNames(styles.WrapperList, { [styles.Open]: isOpen })} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.WrapperItemOrder} >
        <div className={styles.Header}>
          <div className={styles.LeftBlock}>
            <div className={styles.WrapperTitle}>
              <div className={styles.OrderNumber}>
                № {orderNumber}
                {(showSuccess || cancellationProcess === cancellProcess.orderCancelled) &&
              <Badge className={styles.CancellProcess} theme={BadgeTheme.Yellow}>
                {statusOrder.status4}
              </Badge> }
              </div>
              <div className={styles.Date}>{orderDate}</div>
            </div>
          </div>
          <div className={styles.RightBlock}>
            <div className={styles.Sum}>{getPriceFormat(totalSumOrder)} ₽</div>
            <div>
              <IconChevronDown
                width={24}
                height={24}
                className={isOpen ? styles.Down : ''}
              />
            </div>
          </div>
        </div>
        <div onClick={e => e.stopPropagation()}>
          {isOpen && (
            <>
              {!isMobile ? (
                <div className={styles.Container}>
                  {products.map((product) => <ItemOrderPurschases.ItemOrderDesktop key={product.productRn} {...product} />)}
                </div>
              ) : (
                <div className={styles.Container}>
                  {products.map((product) => <ItemOrderPurschases.ItemOrderMobile key={product.productRn} {...product} />)}
                </div>
              )}
              <div className={classNames(styles.InfoOrder, { [styles.Pickup]: order.deliveryType === deliveryType.delivery1 })}>
                <div className={styles.LeftBlock}>
                  {address && <div className={styles.InfoOrderRow}>
                    <div>Способ получения:</div>
                    <div>
                      <span>{deliveryTypeMap[order.deliveryType]}</span>
                      <span className={classNames(styles.Address, { [styles.IsShop]: order.deliveryType === deliveryType.delivery1 })}>
                        {address}
                      </span>
                    </div>
                  </div>}
                  {orderType === typeOrder.order && !cancellationProcess &&
                  <Button
                    size={ButtonSize.S}
                    className={styles.BtnCancellOrder}
                    themes={ButtonThemes.Filter}
                    onClick={() => setActive(true)}>
                    Отменить заказ
                  </Button>}
                  {shopId && isMobile && order.deliveryType === deliveryType.delivery1 && <BuildRoute shopId={shopId}/>}
                </div>
                {shopId && !isMobile && order.deliveryType === deliveryType.delivery1 && <BuildRoute shopId={shopId}/>}
              </div>
            </>
          )}
        </div>
      </div>

      {active && <ModalWindow
        active={active}
        setActive={setActive}
        text="Выберите причину:"
        value="Отмена заказа"
        className={styles.Modal}
        resetValue={reset}
        showSuccess={showSuccess}
      >
        <form className={styles.RadioBtn} onSubmit={handleSubmit(onSubmit)}>
          {Object.values(orderCancell).map((reason, index) => (
            <RadioButton
              key={index}
              id={`radio_btn_order_cancell_${index}`}
              reg={register('formReason')}
              value={orderTypeActual[index]}>
              {reason}
            </RadioButton>
          ))}
          {watchAllFields.formReason && <FormField
            label={'Комментарий:'}
            name={'desc'}
            type={'textarea'}
            register={register}
            value={watchAllFields.desc}
            setValue={setValue}
            error={errors?.desc?.message}
            isValid={Boolean(!errors?.desc?.message) && Boolean(watchAllFields.desc)}
          />}
          <div className={styles.BtnGroup}>
            <Button themes={ButtonThemes.Secondary} onClick={() => { setActive(false); reset() }}>Назад</Button>
            <Button id="btn-personal-order-cancel" disabled={!watchAllFields.formReason} type='submit'>Отменить заказ</Button>
          </div>
        </form>
      </ModalWindow>}
    </div>
  );
};

ItemOrderPurschases.ItemOrderDesktop = function ItemOrderDesktop({ title, price, image, quantity, code }: ItemOrder) {
  return (
    <div className={styles.WrapperContainerDesktop}>
      <div className={styles.WrapperImage}>
        <Image
          width={70}
          height={70}
          layout={'fixed'}
          src={image}
          alt={title}
        />
      </div>
      <div className={styles.Desc}>
        {code ? (
          <MyLink color={LinkColors.DarkBlack} target={'_blank'} href={code}>
            {title}
          </MyLink>
        ) : <span>{title}</span>}
        <div>{quantity} шт.</div>
      </div>
      <div className={styles.Price}>{getPriceFormat(price)} ₽/шт.</div>
      <div className={styles.Sum}>
        {getPriceFormat(price * quantity)} ₽
      </div>
    </div>
  );
};

ItemOrderPurschases.ItemOrderMobile = function ItemOrderMobile({ title, price, image, quantity, code }: ItemOrder) {
  return (
    <div className={styles.ContainerMobile}>
      <div>
        <Image
          width={70}
          height={70}
          src={image}
          alt={title}
        />
      </div>
      <div className={styles.Content}>
        {code ? (
          <MyLink target={'_blank'} href={code}>
            {title}
          </MyLink>
        ) : <span>{title}</span>}
        <div>{getPriceFormat(price)} ₽/шт.</div>
        <div className={styles.Block}>
          <div>{quantity} шт.</div>
          <div className={styles.Summ}>{getPriceFormat(quantity * price)} ₽</div>
        </div>
      </div>
    </div>
  );
};

ItemOrderPurschases.Skeleton = function Skeleton() {
  return (
    <div className={styles.Wrapper}>
      <SkeletonLoading
        width={'100%'}
        height={'83px'}
      />
      <SkeletonLoading
        width={'100%'}
        height={'83px'}
      />
      <SkeletonLoading
        width={'100%'}
        height={'83px'}
      />
      <SkeletonLoading
        width={'100%'}
        height={'83px'}
      />
    </div>
  );
};
