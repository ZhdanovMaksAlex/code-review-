import { wrapper } from '@redux/store';
import { loadServerProps } from '@services/ServiceServerProps/ServiceServerProps';
import { setInitData } from '@redux/slices/header';
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import { IServerProps } from '@models/IServerProps';
import { getAuthMe } from '@entities/Auth';

export function WrapperAuthSSR(
  callback?: (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    serverProps: IServerProps,
    store) => any
): GetServerSideProps {
  return wrapper.getServerSideProps((store) =>
    async(context) => {
      try {
        const serverProps = await loadServerProps(context);
        store.dispatch(setInitData({ ...serverProps }));
        await store.dispatch<any>(getAuthMe());
        const auth = store.getState().auth;
        if (!auth?.isLoggedin) {
          return {
            redirect: {
              destination: '/auth/login',
              statusCode: 302
            }
          };
        }
        if (callback) {
          return await callback(context, serverProps, store);
        }
        return {
          props: {}
        };
      } catch (error) {
        console.warn(error);
        return { props: {} };
      }
    });
}
