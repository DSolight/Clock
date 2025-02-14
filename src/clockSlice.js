import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTimezones = createAsyncThunk('clocks/fetchTimezones', async () => {
  const response = await fetch('/timezones.json');
  return response.json();
});

const clockSlice = createSlice({
  name: 'clocks',
  initialState: {
    clocks: [], // Начальное состояние без часов
    timezones: [],
    loading: false,
    numberOfClocks: 1, // Начальное количество часов
  },
  reducers: {
    setNumberOfClocks: (state, action) => {
      const newNumberOfClocks = action.payload;
      console.log('Setting number of clocks to:', newNumberOfClocks);

      // Удаляем лишние часы или добавляем новые
      state.clocks = state.timezones.slice(0, newNumberOfClocks);
      state.numberOfClocks = newNumberOfClocks;
      console.log('Updated clocks state:', state.clocks);
    },
    updateClockTimezone: (state, action) => {
      const { index, timezone, city } = action.payload;
      state.clocks[index] = { timezone, city };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimezones.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTimezones.fulfilled, (state, action) => {
        state.loading = false;
        state.timezones = action.payload;
        // Устанавливаем начальное состояние clocks на основе первого элемента из timezones
        state.clocks = state.timezones.slice(0, state.numberOfClocks);
      })
      .addCase(fetchTimezones.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setNumberOfClocks, updateClockTimezone } = clockSlice.actions;
export default clockSlice.reducer;
