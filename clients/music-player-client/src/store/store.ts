import { configureStore } from '@reduxjs/toolkit';

import { clientReducer } from '../features/client';;

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});
