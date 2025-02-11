import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    games: [],
    gameDetails: {},
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setGameDetails: (state, action) => {
      const { gameId, details } = action.payload;
      state.gameDetails[gameId] = details;
    },
  },
});

export const { setGames, setGameDetails } = gameSlice.actions;

export default gameSlice.reducer;
