import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  register,
} from "../../utils/AuthAPI";

const initialState = {
  loggedIn: false,
  user: null,
};

export const _login = createAsyncThunk(
  "user/login",
  async (loginRequest, thunkAPI) => {
    try {
      const response = await login(loginRequest);
      return response;
    } catch (error) {
      if (error !== "SyntaxError: Unexpected end of JSON input") return thunkAPI.rejectWithValue();
    }
  }
);

export const _signup = createAsyncThunk(
  "user/signup",
  async (signupRequest, thunkAPI) => {
    try {
      const response = await register(signupRequest);
      return response;
    } catch (error) {
      console.log(error);
      if (error !== "SyntaxError: Unexpected end of JSON input") return thunkAPI.rejectWithValue();
    }
  }
)

export const loginSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [_login.fulfilled]: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    [_login.rejected]: (state, action) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export default loginSlice.reducer;
