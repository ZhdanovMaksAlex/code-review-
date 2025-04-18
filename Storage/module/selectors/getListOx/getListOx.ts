import { RootState } from '@redux/store';

export const getListOx = (state: RootState) => state.storage.listOx;
export const getIsLoadedListOx = (state: RootState) => state.storage.isLoadedListOx;
export const getStorage = (state: RootState) => state.storage;
