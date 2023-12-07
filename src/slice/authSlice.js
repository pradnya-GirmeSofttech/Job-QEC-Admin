import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, userProfile } from "../actions/auth";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

//  Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(userProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.payload); // Log the payload for debugging
        state.loading = false;
        state.user = null;
        state.error = action.payload.error; // Ensure the error property is used
        state.isAuthenticated = false;
      });
  },
});

// export const {logoutUser } = authSlice.actions;

export default authSlice.reducer;
