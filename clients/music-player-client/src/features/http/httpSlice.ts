import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../store';

export const httpSlice = createSlice({
  name: 'http',
  initialState: <State['http']>{
    queries: {},
  },
  reducers: {
    // TODO save, cancel, retry queries
    registerQuery: (state, action: PayloadAction) => {

    },
  },
});

export const {

} = httpSlice.actions;

export const httpReducer = httpSlice.reducer;
