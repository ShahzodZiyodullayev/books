import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import booksReducer from "../reducers/booksReducer";
import snackbarReducer from "../reducers/snackbarReducer";

export default configureStore({
  reducer: {
    auth: userReducer,
    books: booksReducer,
    snackbar: snackbarReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
