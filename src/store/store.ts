import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './slices/scheduleSlice';
import userAccountReducer from './slices/userAccountSlice';

export const store = configureStore({
  reducer: {
    userAccounts: userAccountReducer,
    schedules: scheduleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
