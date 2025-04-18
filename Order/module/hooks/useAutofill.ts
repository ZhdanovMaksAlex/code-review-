import { useProfile } from '@entities/User';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getInfoUser, orderActions } from '@entities/Order';
import { beautifulPhoneFormat } from '@helpers/beautifulPhoneFormat';

export const useAutofill = () => {
  const dispatch = useAppDispatch();
  const { isLoaded: isLoadedProfile, userProfile } = useProfile();
  const infoUser = useAppSelector(getInfoUser);
  useEffect(() => {
    if (isLoadedProfile) {
      dispatch(orderActions.setContacts({
        ...infoUser,
        firstName: userProfile?.firstName || infoUser.firstName,
        lastName: userProfile?.surName || infoUser.lastName,
        phone: beautifulPhoneFormat(userProfile?.phone) || infoUser.phone,
        email: userProfile?.email || infoUser.email,
      }));
    }
  }, [isLoadedProfile]);
};
