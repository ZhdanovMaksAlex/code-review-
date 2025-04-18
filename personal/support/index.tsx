import { WrapperAuthSSR } from '@services/ServiceServerProps';
import { LayoutUser } from '@app/Layout/LayoutUser';
import { PagePersonalSupport } from '@app/components/PagePersonalSupport';

import { GetQuestion, CategoryQuestion } from '@app/entities/Questions';

const Page = () => {
  return (
    <LayoutUser
      isSideBarMenu
      isFeedBack
      title='Поддержка'
    >
      <PagePersonalSupport/>
    </LayoutUser>
  );
};

export const getServerSideProps = WrapperAuthSSR(async(context, serverProps, store) => {
  await store.dispatch(GetQuestion({ typeId: CategoryQuestion.faqLk }));
});

export default Page;
