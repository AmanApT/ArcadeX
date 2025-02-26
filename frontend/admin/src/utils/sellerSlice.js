import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "seller",
  initialState: null,
  reducers: {
    setSellers: (state, action) => {
      return action.payload;
    },
    verifySeller: (state, action) => {
      return state.map((seller) =>
        seller._id === action.payload ? { ...seller, isVerified: true } : seller
      );
    },
  },
});

export const { setSellers, verifySeller } = sellerSlice.actions;

export default sellerSlice.reducer;
