import { createSlice } from '@reduxjs/toolkit';

const timeSlice = createSlice({
  name: 'time',
  initialState: {
    currentTime: Date.now(), // Храним время как метку времени
  },
  reducers: {
    updateTime: (state) => {
      state.currentTime = Date.now(); // Обновляем метку времени
    },
  },
});

export const { updateTime } = timeSlice.actions;
export default timeSlice.reducer;
