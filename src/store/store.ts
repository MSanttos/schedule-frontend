import { configureStore } from '@reduxjs/toolkit';
import userAccountReducer from './slices/userAccountSlice';

export const store = configureStore({
  reducer: {
    userAccounts: userAccountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
