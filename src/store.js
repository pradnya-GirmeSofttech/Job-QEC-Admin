import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import jobReducer from "./slice/jobSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    user: userReducer,
  },
});

export const RootState = {
  auth: { user: null, loading: false, error: null },
  job: { jobs: [], loading: false, error: null },
  user: { users: [], loading: false, error: null },
};
