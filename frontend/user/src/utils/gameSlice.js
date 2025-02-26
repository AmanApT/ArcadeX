import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    games: [],
    gameDetails: {},
    sellerGames: [],
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setGameDetails: (state, action) => {
      const { gameId, details } = action.payload;
      state.gameDetails[gameId] = details;
    },
    setSellerGames: (state, action) => {
      state.sellerGames = action.payload;
    },
    deleteSellerGames: (state, action) => {
      const gameIdToDelete = action.payload;
      state.sellerGames = state.sellerGames.filter(
        (gameId) => gameId !== gameIdToDelete
      );
    },
    // removeGameDetails: (state, action) => {
    //   const gameIdToRemove = action.payload;
    //   delete state.gameDetails[gameIdToRemove];
    // },
  },
});

export const { setGames, setGameDetails, setSellerGames, deleteSellerGames } =
  gameSlice.actions;

export default gameSlice.reducer;
