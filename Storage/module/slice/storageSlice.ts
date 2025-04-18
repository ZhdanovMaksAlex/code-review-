import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchListOx } from '../services/fetchListOx';
import { StorageSchema, StorageType } from '../types/storageSchema';
import { stringToDate, isTimeExpired } from '@app/shared/helpers/formatDate';

const initialState: StorageSchema = {
  recordStorage: null,
  listOx: [],
  isLoadedListOx: false,
};

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setRecordStorage: (state, action: PayloadAction<StorageType>) => {
      state.recordStorage = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListOx.pending, (state) => {
      state.isLoadedListOx = false;
    });
    builder.addCase(fetchListOx.fulfilled, (state, action) => {
      if (action.payload) {
        state.listOx = action.payload
          .map(item => ({
            ...item,
            dataEndDate: item.dataEnd ? stringToDate(item.dataEnd) : null,
            isTimeExpired: item.dataEnd ? isTimeExpired(stringToDate(item.dataEnd)) : false,
          }))
          .sort((a, b) => {
            if (a.dataEndDate === null && b.dataEndDate === null) { return 0 }
            if (a.dataEndDate === null) { return 1 }
            if (b.dataEndDate === null) { return -1 }

            return a.dataEndDate.getTime() - b.dataEndDate.getTime();
          });
      }
      state.isLoadedListOx = true;
    });

    builder.addCase(fetchListOx.rejected, (state) => {
      state.isLoadedListOx = true;
    });
  },
});

export const { actions: storageActions } = storageSlice;
