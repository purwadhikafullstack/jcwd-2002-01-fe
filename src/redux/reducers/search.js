import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  searchInput: ""
};

const searchReducer = createSlice({
  name: "search",
  initialState: initial_state,
  reducers: {
    search: (state, action) => {
       state.searchInput = action.payload

       return action.payload.searchInput
    },
  },
});

export const { search } = searchReducer.actions;
export default searchReducer.reducer;
