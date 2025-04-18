import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { PagePersonalRecords } from '@components/PagePersonalRecords';
import { SectionsPersonalAccount } from '@shared/const';
import config from '@app/config';

const Page = () => {
  return (
    <LayoutUser
      isSideBarMenu
      isFeedBack
      title='Мои записи на услуги'
    >
      <PagePersonalRecords/>
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR(() => {
  if (config.safeModeLK.includes(SectionsPersonalAccount.Records)) {
    return {
      redirect: {
        destination: '/personal/',
        statusCode: 302
      }
    };
  }
});

export default Page;
