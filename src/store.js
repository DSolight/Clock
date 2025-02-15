import { configureStore } from '@reduxjs/toolkit';
import clockReducer from './clockSlice';

export const store = configureStore({
  reducer: {
    clocks: clockReducer,
  },
});
