import { createSlice } from "@reduxjs/toolkit";
import {
  addNewUser,
  fetchUsersWithUserRole,
  deleteUser,
  updateUser,
} from "../actions/user";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

//  Auth slice
const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        console.log("slice", state.users);
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsersWithUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersWithUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersWithUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   .addCase(deleteUser.fulfilled, (state, action) => {
      //     state.users = state.users.filter((user) => user._id !== action.payload);
      //   })
      .addCase(deleteUser.rejected, (state, action) => {})

      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users?.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        let index = state.users?.findIndex(
          (item) => item._id === action.payload.id
        );
        state.users[index] = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {logoutUser } = authSlice.actions;

export default user.reducer;
