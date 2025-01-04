import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  mockUserProfile,
  mockWorkingHours,
  defaultTimeZone,
} from "../../api/mockData";

// Async thunks for profile
export const fetchProfile = createAsyncThunk(
  "profileAndWorkingHours/fetchProfile",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUserProfile); // Simulating a profile fetch
      }, 1000); // Simulating a 1-second delay
    });
  }
);

export const updateProfile = createAsyncThunk(
  "profileAndWorkingHours/updateProfile",
  async (profile) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(profile); // Simulating profile update
      }, 1000); // Simulating a 1-second delay
    });
  }
);

// Async thunks for working hours
export const fetchWorkingHours = createAsyncThunk(
  "profileAndWorkingHours/fetchWorkingHours",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          workingHours: mockWorkingHours, // Simulate the working hours data
          timeZone: defaultTimeZone, // Return the default time zone
        });
      }, 1000); // Simulating a 1-second delay
    });
  }
);

// Update Working Hours with Dynamic Time Zone
export const updateWorkingHours = createAsyncThunk(
  "profileAndWorkingHours/updateWorkingHours",
  async ({ workingHours, timeZone }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          workingHours, // Return updated working hours
          timeZone, // Use the dynamically passed time zone
        });
      }, 1000); // Simulating a 1-second delay
    });
  }
);

const initialState = {
  profile: null,
  workingHours: [], // Starting with an empty array for working hours
  timeZone: defaultTimeZone, // Set default time zone
  status: "idle", // Track status of async actions: 'idle', 'loading', 'succeeded', 'failed'
  error: null, // Any error message
};

const profileAndWorkingHoursSlice = createSlice({
  name: "profileAndWorkingHours",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setWorkingHours: (state, action) => {
      state.workingHours = action.payload;
    },
    setTimeZone: (state, action) => {
      state.timeZone = action.payload; // Dynamic time zone update
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
      // Profile reducers
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Working hours reducers
      .addCase(fetchWorkingHours.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkingHours.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workingHours = action.payload.workingHours; // Update working hours
        state.timeZone = action.payload.timeZone; // Update time zone
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
        state.workingHours = action.payload.workingHours; // Updated working hours
        state.timeZone = action.payload.timeZone; // Updated time zone
      })
      .addCase(updateWorkingHours.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setProfile,
  setWorkingHours,
  setTimeZone, // Exporting the action to set time zone
  addTimeSlot,
  removeTimeSlot,
  removeAllTimeSlots,
} = profileAndWorkingHoursSlice.actions;

export default profileAndWorkingHoursSlice.reducer;
