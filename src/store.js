import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "./features/inbox/inboxSlice";
import menuReducer from "./features/menu/menuSlice";
import authSlice from "./features/auth/authSlice";
import billingSlice from "./features/billing/billingSlice";
import workingHourSlice from "./features/workingHours/workingHourSlice";
import profileSlice from "./features/profile/profileSlice";

const store = configureStore({
  reducer: {
    inbox: inboxReducer,
    menu: menuReducer,
    auth: authSlice,
    billing: billingSlice,
    workingHours: workingHourSlice,
    profile: profileSlice,
  },
});

export default store;
