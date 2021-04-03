import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../store';
import { DownloadingStatus } from '../../statuses';

const downloadingDefaultState: State['downloading'] = {
  totalCount: 0,
  downloadedCount: 0,
  status: DownloadingStatus.idle,
  progress: {
    percent: -1,
    downloadingCount: 0,
  },
};

const downloadingSlice = createSlice({
  name: 'downloading',
  initialState: downloadingDefaultState,
  reducers: {
    downloadStart: (state) => {
      state.status = DownloadingStatus.downloading;
    },
    downloadSuccess: (state) => {
      state.status = DownloadingStatus.success;
    },
    downloadError: (state) => {
      state.status = DownloadingStatus.error;
    },
    downloadInit: (state, action: PayloadAction<number>) => {
      state.totalCount += action.payload;
    },
    downloadedMusic: (state) => {
      state.downloadedCount++;

      // TODO handle error cases with a report to tell the user
      // TODO which music could not be downloaded
      if (state.downloadedCount === state.totalCount) {
        state.status = DownloadingStatus.success;
      }
    },
    downloadProgress: (state, action: PayloadAction<{ percent: number, downloadingCount: number }>) => {
      state.progress.percent = action.payload.percent;
      state.progress.downloadingCount = action.payload.downloadingCount;
    },
    downloadComplete: () => {
      return downloadingDefaultState;
    },
    downloadStillOnGoing: (state, action: PayloadAction<DownloadStillOnGoingPayload>) => {
      state.status = DownloadingStatus.downloading;
      state.progress.downloadingCount = action.payload.downloadingCount;
      state.totalCount = action.payload.totalCount;
    },
  },
});

export const {
  downloadStart,
  downloadSuccess,
  downloadError,
  downloadInit,
  downloadedMusic,
  downloadProgress,
  downloadComplete,
  downloadStillOnGoing,
} = downloadingSlice.actions;

export const downloadingReducer = downloadingSlice.reducer;

export interface DownloadStillOnGoingPayload {
  downloadingCount: number;
  totalCount: number;
}
