import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { messages, messageDetails } from "../../api/mockData";

// Async Thunk to Fetch Messages
export const fetchMessages = createAsyncThunk(
  "inbox/fetchMessages",
  async (amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const mockData = { messages, messageDetails };
          resolve({
            messages: mockData.messages,
            currentMessage: mockData.messageDetails[amount],
          });
        } catch (error) {
          reject("Error fetching messages");
        }
      }, 1500);
    });
  }
);

// Initial State
const initialState = {
  messages: [],
  currentMessage: null,
  status: "idle",
};

// Inbox Slice
const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    getCurrentMessage: (state, action) => {
      state.currentMessage = action.payload; // Set the current message based on user action
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading"; // Update status to loading
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages; // Populate messages
        state.currentMessage = action.payload.currentMessage; // Set the current message
        state.status = "idle"; // Reset status
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.status = "failed"; // Set status to failed in case of error
      });
  },
});

export const { getCurrentMessage } = inboxSlice.actions;
export default inboxSlice.reducer;
