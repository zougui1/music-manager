import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State, initApp } from '../../store';
import { getConnectionStatus } from '../../utils';

export const clientSlice = createSlice({
  name: 'client',
  initialState: <State['client']>{
    language: 'en',
    user: null,
    accessToken: null,
    status: getConnectionStatus(),
  },
  extraReducers: builder => {
    builder
      .addCase(initApp, (state, action: PayloadAction<string>) => {
        state.language = action.payload;
      });
  },
  reducers: {
    login: (state, action: PayloadAction<{ token: string, user: any }>) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
    },
    authorizedRequestIntercepted: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    unauthorizedRequestIntercepted: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    updateConnectionStatus: state => {
      state.status = getConnectionStatus();
    },
  },
});

export const {
  authorizedRequestIntercepted,
  unauthorizedRequestIntercepted,
  login,
  updateConnectionStatus,
} = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
