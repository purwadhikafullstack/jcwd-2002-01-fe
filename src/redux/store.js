import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/auth";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
