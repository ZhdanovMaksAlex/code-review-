import { PagePersonalSettingAwarenessUser } from '@app/components/PagePersonalSettingAwarenessUser';
import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { SectionsPersonalAccount } from '@shared/const';
import config from '@app/config';

const Page = () => {
  return (
    <LayoutUser isSideBarMenu isFeedBack title="Настройки">
      <PagePersonalSettingAwarenessUser />
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR(() => {
  if (config.safeModeLK.includes(SectionsPersonalAccount.Setting)) {
    return {
      redirect: {
        destination: '/personal/',
        statusCode: 302,
      },
    };
  }
});

export default Page;
