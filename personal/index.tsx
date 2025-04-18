import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { PagePersonalHome } from '@components/PagePersonalHome';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { CodeBanner, getBannerByPage } from '@entities/BannerPage';
import { fetchUserProfile } from '@app/entities/User';
import { RootState } from '@app/redux/store';
import { ServiceCookies } from '@services/ServiceCookies';

const Page = () => {
  return (
    <LayoutUser
      isSideBarMenu
      isFeedBack
      title='Личный кабинет'
    >
      <PagePersonalHome />
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR(async(context, serverProps, store) => {
  await store.dispatch(fetchUserProfile());
  const dataUser = (store.getState() as RootState).user.userProfileData;

  const hasVisited = ServiceCookies.get(ServiceCookies.ROUTE_LK);

  if (!dataUser.firstName && !hasVisited) {
    ServiceCookies.set(ServiceCookies.ROUTE_LK, context.req.url);
    return {
      redirect: {
        destination: '/personal/info/',
        statusCode: 302,
      },
    };
  }
  await store.dispatch(getBannerByPage({
    code: CodeBanner.BannerLk,
    regionId: +serverProps.region.REGION
  }));
});

export default Page;
