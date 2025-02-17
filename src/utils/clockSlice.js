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
      console.log('Setting number of clocks:', action.payload);
      // Обновляем количество часов
      state.numberOfClocks = newNumberOfClocks;

      // Добавляем новые часы, сохраняя старые
      if (newNumberOfClocks > state.clocks.length) {
        const additionalClocks = state.timezones
          .filter(tz => !state.clocks.some(clock => clock.timezone === tz.timezone))
          .slice(0, newNumberOfClocks - state.clocks.length)
          .map(tz => ({
            timezone: tz.timezone,
            city: tz.city,
          }));
        state.clocks = [...state.clocks, ...additionalClocks];
      } else {
        state.clocks = state.clocks.slice(0, newNumberOfClocks);
      }
    },
    updateClockTimezone: (state, action) => {
      console.log('Updating timezone for clock at index:', action.payload);
      const { index, timezone, city } = action.payload;
      if (index >= 0 && index < state.clocks.length) {
        state.clocks[index] = { timezone, city };
      }
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
        state.clocks = state.timezones.slice(0, state.numberOfClocks).map(tz => ({
          timezone: tz.timezone,
          city: tz.city,
        }));
      })
      .addCase(fetchTimezones.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setNumberOfClocks, updateClockTimezone } = clockSlice.actions;
export default clockSlice.reducer;
