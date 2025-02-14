import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTimezones = createAsyncThunk("clocks/fetchTimezones", async () => {
  const response = await fetch("/timezones.json")
  return response.json()
})

const clockSlice = createSlice({
  name: "clocks",
  initialState: {
    clocks: [null], // Начальное состояние с одним часом
    timezones: [],
    loading: false,
    numberOfClocks: 1, // Начальное количество часов
  },
  reducers: {
    setClocks: (state, action) => {
      state.clocks = action.payload
    },
    setNumberOfClocks: (state, action) => {
      console.log("Updating number of clocks:", action.payload)
      const newNumberOfClocks = action.payload
      if (newNumberOfClocks > state.clocks.length) {
        // Добавляем новые часы с пустыми значениями timezone
        state.clocks = [...state.clocks, ...Array(newNumberOfClocks - state.clocks.length).fill(null)]
      } else {
        // Удаляем лишние часы
        state.clocks = state.clocks.slice(0, newNumberOfClocks)
      }
      console.log("Updated clocks state:", state.clocks)
    },
    updateClockTimezone: (state, action) => {
      const { index, timezone } = action.payload
      state.clocks[index] = timezone
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimezones.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTimezones.fulfilled, (state, action) => {
        state.loading = false
        state.timezones = action.payload
      })
      .addCase(fetchTimezones.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setClocks, setNumberOfClocks, updateClockTimezone } = clockSlice.actions
export default clockSlice.reducer
