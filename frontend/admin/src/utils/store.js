import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sellerReducer from "./sellerSlice";
import gameReducer from "./gamesSlice";
import adminReducer from "./adminSlice";
import fudReducer from "./fudSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    game: gameReducer,
    admin: adminReducer,
    fud: fudReducer,
  },
});

export default store;
