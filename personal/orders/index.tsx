import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { PagePersonalOrders } from '@app/components/PagePersonalOrders';
import { SectionsPersonalAccount } from '@shared/const';
import config from '@app/config';

const Page = () => {
  return (
    <LayoutUser
      isSideBarMenu
      isFeedBack
      title='Мои заказы'
    >
      <PagePersonalOrders/>
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR(() => {
  if (config.safeModeLK.includes(SectionsPersonalAccount.Orders)) {
    return {
      redirect: {
        destination: '/personal/',
        statusCode: 302
      }
    };
  }
});

export default Page;
