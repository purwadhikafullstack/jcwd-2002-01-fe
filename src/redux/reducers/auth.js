import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  id: 0,
  username: "",
  profile_image: "",
  full_name: "",
  email: "",
};

export const AuthReducer = createSlice({
  name: "auth",
  initial_state,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      state.profile_image = action.payload.profile_image;
    },
    logout: (state, action) => {
      return initial_state;
    },
  },
});

export const { login, logout } = AuthReducer.actions;

export default AuthReducer.reducer;
