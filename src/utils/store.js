import { configureStore } from '@reduxjs/toolkit';
import clockSlice from './clockSlice';
import timeSlice from './timeSlice';

const store = configureStore({
  reducer: {
    clocks: clockSlice,
    time: timeSlice,
  },
});

export default store;
