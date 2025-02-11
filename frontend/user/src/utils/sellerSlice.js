import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "seller",
  initialState: null,
  reducers: {
    addSeller: (state, action) => {
      return action.payload;
    },
    removeSeller: () => {
      return null;
    },
  },
});

export const { addSeller, removeSeller } = sellerSlice.actions;

export default sellerSlice.reducer;
