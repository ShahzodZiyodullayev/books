import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  title: string;
  color: string;
  isRefresh: boolean;
}

const initialState: SnackbarState = {
  title: "",
  color: "",
  isRefresh: false,
};

const snackbarReducer = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnack: (
      state,
      action: PayloadAction<{ title: string; color: string }>,
    ) => {
      state.title = action.payload.title;
      state.color = action.payload.color;
      state.isRefresh = !state.isRefresh;
    },
  },
});

export const { setSnack } = snackbarReducer.actions;
export default snackbarReducer.reducer;
