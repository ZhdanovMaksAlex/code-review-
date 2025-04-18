import { Fragment, useState } from 'react';
import { useAppSelector } from '@app/redux/hooks';
import { selectRegion } from '@redux/slices/header';
import { getResultStepData } from '@entities/Order';
import { useRouter } from 'next/router';
import { ServiceOrder } from '@services/ServiceOrder';
import { IOrderInputModel } from '@app/models/Order/IOrderInputModel';
import { Button } from '@ui-kit/MyButton';
import { ServiceEcommerce2 } from '@app/services/ServiceEcommerce';
import { formatPhoneToApi } from '@app/shared/helpers/formedPhone';
import { ServiceYaPay } from '@app/services/ServiceYaPay';
import { ErrorTemplate } from '@app/features/fastOrder';
import { Modal } from '@app/shared';

export const OrderingButton = () => {
  const router = useRouter();
  const { stepDelivery, stepContacts, stepPayment } = useAppSelector(getResultStepData);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const region = useAppSelector(selectRegion);
  const model = useAppSelector((state) => state.order.data.model);
  const infoUser = useAppSelector((state) => state.order.data.model.infoUser);
  const { items } = useAppSelector((state) => state.basket.data.basket);

  const OrderFinish = async() => {
    setDisabled(true);
    if (stepDelivery && stepContacts && stepPayment) {
      // dispatch(setResetModel());
      const orderInput: IOrderInputModel = {
        regionId: +region.REGION,
        description: model.addComment,
        paymentId: model.payment.id,
        shop: model?.shop?.id,
        deliveryId: model.delivery.id,
        name: infoUser.firstName,
        lastName: infoUser.lastName,
        email: infoUser.email,
        phone: formatPhoneToApi(infoUser.phone),
        comment: infoUser.comment,
        offerAkb: model.offerAkb,
        offerSecret: model.offerSecret,
        offerWiper: model.offerWiper,
        address: model.address,
        fias: JSON.stringify(model.fias),
        consultation: infoUser.consultation,
        record: infoUser.record,
        seasonStorage: infoUser.seasonStorage,
        legalEntity: infoUser.legalEntity,
        offerTyreCovers: infoUser.offerTyreCovers,
        inn: infoUser.inn,
        kpp: infoUser.kpp,
        nameOrganization: infoUser.nameOrganization,
        addressOrganization: infoUser.addressOrganization,
        bik: infoUser.bik,
        checkingAccount: infoUser.checkingAccount,
        pddConsent: infoUser.agreement || null,
        subscriptionConsent: infoUser.receiveNotifications || null,
      };

      try {
        setIsError(false);
        if (model?.payment?.code.indexOf('yandex') > -1) {
          const result = await ServiceYaPay.orders(orderInput);
          window.open(result.paymentUrl, '_top');
          return;
        }

        const order = await ServiceOrder.add(orderInput);
        if (order.status === 'ok') {
          ServiceEcommerce2.purchase({
            transaction_id: order.id.toString(),
            items,
          });

          setTimeout(
            () =>
              router.push(`/myorder/${order.id}.${order.hash}/?go-to-payment`),
            1000
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      setDisabled(false);
    }
  };

  return (
    <Fragment>
      <Button
        fullWith
        disabled={!stepDelivery || !stepContacts || !stepPayment || disabled}
        onClick={OrderFinish}
        data-testid="btn-design-order"
      >
        Оформить заказ
      </Button>
      {isError && (
        <Modal isOpen={isError} onClose={() => setIsError(false)}>
          <ErrorTemplate text="Приносим извинения за неудобства" />
        </Modal>
      )}
    </Fragment>
  );
};
