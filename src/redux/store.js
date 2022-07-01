import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import searchReducer from "./reducers/search";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});

export default store;
