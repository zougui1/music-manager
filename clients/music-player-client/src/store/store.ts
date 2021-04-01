import { configureStore } from '@reduxjs/toolkit';

import { clientReducer } from '../features/client';
import { downloadingReducer } from '../features/downloading';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    downloading: downloadingReducer,
  },
});
