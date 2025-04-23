import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../models/schedule";
import { createSchedule, deleteSchedule, fetchSchedules, updateSchedule } from "../thunks/ScheduleThunks";

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default scheduleSlice.reducer;