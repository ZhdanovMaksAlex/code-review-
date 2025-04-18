import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { PagePersonalGuaranty } from '@components/PagePersonalGuaranty';
import { SectionsPersonalAccount } from '@shared/const';
import config from '@app/config';

const Page = () => {
  return (
    <LayoutUser
      isSideBarMenu
      isFeedBack
      title='Расширенные гарантии'
    >
      <PagePersonalGuaranty />
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR(() => {
  if (config.safeModeLK.includes(SectionsPersonalAccount.Guaranty)) {
    return {
      redirect: {
        destination: '/personal/',
        statusCode: 302
      }
    };
  }
});

export default Page;
