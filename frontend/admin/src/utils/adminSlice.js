import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    setAdmin: (state, action) => {
      return action.payload;
    },
    removeAdmin: () => {
      return null;
    },
  },
});

export const { setAdmin, removeAdmin } = adminSlice.actions;

export default adminSlice.reducer;
