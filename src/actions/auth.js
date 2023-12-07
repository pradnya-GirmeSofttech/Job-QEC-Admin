import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api";

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await api.post(
        `/register`,
        {
          name,
          email,
          password,
          role,
        },
        config
      );

      const user = response.data;
      localStorage.setItem("authToken", user.token);

      return user;
    } catch (err) {
      console.error("Error", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

// Create an async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      // Assuming your API returns a token on successful login
      const token = response.data.token;
      const userData = response.data.user;
      // Save the token to local storage
      localStorage.setItem("token", token);

      return { success: true, token: token, user: userData };
    } catch (error) {
      // Handle login failure
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue({
        error: error.response ? error.response.data : error.message,
      });
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.get(`/logout`);
      localStorage.removeItem("token");

      // Assuming a successful logout, dispatch the logoutUser action
      return null;
    } catch (error) {
      console.error("Logout error:", error);

      return rejectWithValue(error.response.data);
    }
  }
);

// authActions.js (continued)

// Action to fetch user data based on the token
// export const fetchUser = createAsyncThunk(
//   "auth/fetchUser",
//   async (token, { rejectWithValue }) => {
//     try {
//       // Make an API request to fetch user data using the token
//       const headers = {
//         Authorization: ` ${token}`, // Include the token in the "Authorization" header
//       };
//       const response = await axios.get(`${url}/me`, {
//         headers,
//       });

//       const user = response.data;

//       return user;
//     } catch (err) {
//       console.error("Error", err.response.data);
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

//  User profile
export const userProfile = createAsyncThunk("auth/userProfile", async () => {
  try {
    const response = await api.get(`/me`);
    const user = response.data;

    // You can also log the user here to verify the data
    console.log("user", user);

    return user;
  } catch (err) {
    // Handle any errors, if necessary
    console.error("Error", err.response.data);
    throw err;
  }
});
