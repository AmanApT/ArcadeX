import { createSlice } from "@reduxjs/toolkit";

const fudSlice = createSlice({
  name: "fud",
  initialState: {
    isDialogOpen: false,
    featureName: "",
  },
  reducers: {
    openDialog: (state, action) => {
      state.isDialogOpen = true;
      state.featureName = action.payload;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
      state.featureName = "";
    },
  },
});

export const { openDialog, closeDialog } = fudSlice.actions;

export default fudSlice.reducer;
