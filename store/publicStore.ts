import { configureStore } from '@reduxjs/toolkit';
// import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    // ui: uiReducer,
  },
});

export type PublicState = ReturnType<typeof store.getState>;
