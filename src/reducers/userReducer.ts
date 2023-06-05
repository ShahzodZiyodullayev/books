import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoading: boolean;
  loggedIn: boolean;
  user: null | any; // Bu yerda "user"ning haqiqiy tipini belgilashingiz mumkin
}

const userString = localStorage.getItem("user");

const initialState: AuthState = {
  isLoading: false,
  loggedIn: true,
  user: userString ? JSON.parse(userString) : null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserStart: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    loginUserSuccess: (state, { payload }: PayloadAction<object>) => {
      state.isLoading = false;
      localStorage.setItem("user", JSON.stringify(payload));
      const userString = localStorage.getItem("user");
      state.user = userString ? JSON.parse(userString) : null;
    },
    loginUserFailure: (state, { payload }: PayloadAction<any>) => {
      state.isLoading = payload;
    },
    loginUserOut: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("user");
    },
    signUserUp: (state, { payload }: PayloadAction<object>) => {
      state.isLoading = false;
      localStorage.setItem("user", JSON.stringify(payload));
      const userString = localStorage.getItem("user");
      state.user = userString ? JSON.parse(userString) : null;
    },
    isUserLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.loggedIn = payload;
      !payload && localStorage.removeItem("user");
    },
  },
});

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  loginUserOut,
  signUserUp,
  isUserLoggedIn,
} = authReducer.actions;

export default authReducer.reducer;
