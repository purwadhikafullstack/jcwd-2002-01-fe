import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import searchReducer from "./reducers/search"
import cartReducer from "./reducers/cart"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    cart: cartReducer
  },
});

export default store;
