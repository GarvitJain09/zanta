import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "./features/inbox/inboxSlice";
import menuReducer from "./features/menu/menuSlice";
import authSlice from "./features/auth/authSlice";
import billingSlice from "./features/billing/billingSlice";

const store = configureStore({
  reducer: {
    inbox: inboxReducer,
    menu: menuReducer,
    auth: authSlice,
    billing: billingSlice,
  },
});

export default store;
