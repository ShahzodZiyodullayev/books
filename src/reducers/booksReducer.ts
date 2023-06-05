import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  allBooks: object[];
  searchBooks: object[];
  isRefresh: boolean;
  isLoading: boolean;
} = {
  allBooks: [],
  searchBooks: [],
  isRefresh: false,
  isLoading: false,
};

const booksReducer = createSlice({
  name: "books",
  initialState,
  reducers: {
    startStopLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAllBooks: (state, { payload }: PayloadAction<any>) => {
      state.allBooks = payload ? payload : [];
    },
    setSearchBooks: (state, { payload }: PayloadAction<object[]>) => {
      state.searchBooks = payload ? payload : [];
    },
    isRefresh: (state) => {
      state.isRefresh = !state.isRefresh;
    },
  },
});

export const { setAllBooks, setSearchBooks, isRefresh, startStopLoading } =
  booksReducer.actions;
export default booksReducer.reducer;
