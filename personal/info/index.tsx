import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { PagePersonalInfo } from '@components/PagePersonalInfo';

const Page = () => {
  return (
    <LayoutUser
      isSideBarMenu
      isFeedBack
      title='Мои данные'
    >
      <PagePersonalInfo/>
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR();

export default Page;
