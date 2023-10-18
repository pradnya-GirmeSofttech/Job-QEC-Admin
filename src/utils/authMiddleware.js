// authMiddleware.js

import { setAuthToken, setUser } from "./authSlice"; // Import your Redux actions

export const loadUserMiddleware = (store) => (next) => (action) => {
  if (action.type === "app/init") {
    // Load the token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Set the token in the Redux store
      store.dispatch(setAuthToken(token));

      // Fetch user information based on the token and set it in the Redux store
      // You can implement this logic in your authSlice or authReducer
      // Example: store.dispatch(fetchUser(token))
    }
  }

  return next(action);
};
