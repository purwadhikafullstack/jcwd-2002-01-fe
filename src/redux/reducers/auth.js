import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  id: 0,
  username: "",
  profile_image: "",
  full_name: "",
  email: "",
  is_verified: "",
  role: "",
  gender: "",
  age: ""
};

const authReducer = createSlice({
  name: "auth",
  initialState: initial_state,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      state.profile_image = action.payload.profile_image;
      state.is_verified = action.payload.is_verified;
      state.role = action.payload.role;
      state.age = action.payload.age
      state.gender = action.payload.gender
    },
    logout: (state, action) => {
      return initial_state;
    },
  },
});

export const { login, logout } = authReducer.actions;
export default authReducer.reducer;
