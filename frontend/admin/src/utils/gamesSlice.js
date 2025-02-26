import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "game",
  initialState: null,
  reducers: {
    setGames: (state, action) => {
      return action.payload;
    },
  },
});

export const { setGames } = gamesSlice.actions;

export default gamesSlice.reducer;
