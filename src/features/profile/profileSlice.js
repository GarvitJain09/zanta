// src/store/workingHoursSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockUserProfile } from "../../api/mockData";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUserProfile);
      }, 1000); // Simulating a 1-second delay
    });
  }
);

// Simulate updating working hours (with mock API)
export const updateProfile = createAsyncThunk(
  "workingHours/updateProfile",
  async (profile) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulating a successful update response
        // In a real API, you would use a fetch/axios call here
        resolve(profile);
      }, 1000); // Simulating a 1-second delay
    });
  }
);

const initialState = {
  data: null,
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
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
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { profile } = profileSlice.actions;

export default profileSlice.reducer;
