import { RootState } from '@redux/store';

export const getContactResult = (state: RootState) => state.order.data.resultStep?.stepContacts;
