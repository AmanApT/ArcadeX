import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sellerReducer from "./sellerSlice";
import gameReducer from "./gameSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    game: gameReducer,
  },
});

export default store;
