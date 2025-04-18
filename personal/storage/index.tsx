import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { PagePersonalStorage } from '@components/PagePersonalStorage';
import { SectionsPersonalAccount } from '@shared/const';
import config from '@app/config';

const Page = () => {
  return (
    <LayoutUser
      isSideBarMenu
      isFeedBack
      title='Хранение колёс'
    >
      <PagePersonalStorage/>
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR(() => {
  if (config.safeModeLK.includes(SectionsPersonalAccount.Storage)) {
    return {
      redirect: {
        destination: '/personal/',
        statusCode: 302
      }
    };
  }
});

export default Page;
