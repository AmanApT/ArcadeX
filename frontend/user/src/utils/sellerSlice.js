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
    updateSellerName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { addSeller, removeSeller, updateSellerName } =
  sellerSlice.actions;

export default sellerSlice.reducer;
