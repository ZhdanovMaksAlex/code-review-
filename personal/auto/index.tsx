import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { PagePersonalAuto } from '@app/components/PagePersonalAuto';
import { SectionsPersonalAccount } from '@shared/const';
import config from '@app/config';

const Page = () => {
  return (
    <LayoutUser
      isSideBarMenu
      isFeedBack
      title='Мои автомобили'
    >
      <PagePersonalAuto/>
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR(() => {
  if (config.safeModeLK.includes(SectionsPersonalAccount.Auto)) {
    return {
      redirect: {
        destination: '/personal/',
        statusCode: 302
      }
    };
  }
});

export default Page;
