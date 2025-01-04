// src/store/workingHoursSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockWorkingHours, defaultTimeZone } from "../../api/mockData";

// Simulate fetching working hours (same as before)
export const fetchWorkingHours = createAsyncThunk(
  "workingHours/fetchWorkingHours",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockWorkingHours);
      }, 1000); // Simulating a 1-second delay
    });
  }
);

// Simulate updating working hours (with mock API)
export const updateWorkingHours = createAsyncThunk(
  "workingHours/updateWorkingHours",
  async (workingHours) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulating a successful update response
        // In a real API, you would use a fetch/axios call here
        resolve(workingHours);
      }, 1000); // Simulating a 1-second delay
    });
  }
);

const initialState = {
  workingHours: [],
  timeZone: defaultTimeZone,
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const workingHoursSlice = createSlice({
  name: "workingHours",
  initialState,
  reducers: {
    setWorkingHours: (state, action) => {
      state.workingHours = action.payload;
    },
    addTimeSlot: (state, action) => {
      const { dayIndex, newTimeSlot } = action.payload;
      state.workingHours[dayIndex].times.push(newTimeSlot);
    },
    removeTimeSlot: (state, action) => {
      const { dayIndex, timeIndex } = action.payload;
      state.workingHours[dayIndex].times.splice(timeIndex, 1);
    },
    removeAllTimeSlots: (state, action) => {
      const { dayIndex } = action.payload;
      state.workingHours[dayIndex].times = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkingHours.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkingHours.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workingHours = action.payload;
      })
      .addCase(fetchWorkingHours.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateWorkingHours.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWorkingHours.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workingHours = action.payload;
      })
      .addCase(updateWorkingHours.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setWorkingHours,
  addTimeSlot,
  removeTimeSlot,
  removeAllTimeSlots,
} = workingHoursSlice.actions;

export default workingHoursSlice.reducer;
