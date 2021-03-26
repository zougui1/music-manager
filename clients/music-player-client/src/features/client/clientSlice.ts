import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State, initApp } from '../../store';

export const clientSlice = createSlice({
  name: 'client',
  initialState: <State['client']>{
    language: 'en',
    user: null,
    accessToken: null,
    //user: {},
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
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const {
  updateAccessToken,
  login,
} = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
