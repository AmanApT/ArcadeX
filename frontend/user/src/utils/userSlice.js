import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
    addCartItem: (state, action) => {
      const gameIdToAdd = action.payload;
      if (!state.cartlist.includes(gameIdToAdd)) {
        state.cartlist.push(gameIdToAdd);
      }
    },
    addWishlistItem: (state, action) => {
      const gameIdToAdd = action.payload;
      if (!state.wishlist.includes(gameIdToAdd)) {
        state.wishlist.push(gameIdToAdd);
      }
    },
    addPurchasedItem: (state, action) => {
      const gameIdToAdd = action.payload;
      if (!state.purchasedGames.includes(gameIdToAdd)) {
        state.purchasedGames.push(gameIdToAdd);
      }
    },
    removeCartItem: (state, action) => {
      const gameIdToRemove = action.payload;
      state.cartlist = state.cartlist.filter(
        (gameId) => gameId !== gameIdToRemove
      );
    },
    removeWishlistItem: (state, action) => {
      const gameIdToRemove = action.payload;
      state.wishlist = state.wishlist.filter(
        (gameId) => gameId !== gameIdToRemove
      );
    },
    clearCart: (state, action) => {
      state.cartlist = [];
    },
  },
});

export const {
  addUser,
  removeUser,
  removeCartItem,
  removeWishlistItem,
  addWishlistItem,
  addCartItem,
  addPurchasedItem,
  clearCart,
} = userSlice.actions;

export default userSlice.reducer;
