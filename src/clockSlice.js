import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTimezones = createAsyncThunk('clocks/fetchTimezones', async () => {
  const response = await fetch('/timezones.json');
  return response.json();
});

const clockSlice = createSlice({
  name: 'clocks',
  initialState: {
    clocks: [],
    timezones: [],
    loading: false,
  },
  reducers: {
    setClocks: (state, action) => {
      state.clocks = action.payload;
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
      })
      .addCase(fetchTimezones.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setClocks } = clockSlice.actions;
export default clockSlice.reducer;
