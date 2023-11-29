import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api";

// Registration of new user
export const loginNewUser = createAsyncThunk(
  "user/loginNewUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await api.post(
        `/login`,
        {
          email,
          password,
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

// New user creation
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async ({ name, email, role }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/adduser`, {
        name,
        email,
        role,
      });

      const user = response.data.user;
      console.log("user", user);
      return user;
    } catch (err) {
      console.error("Error", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
// Delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/deleteuser/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  Get user with user roles
export const fetchUsersWithUserRole = createAsyncThunk(
  "user/fetchUsersWithUserRole",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users`);

      const data = await response.data;

      return data.users;
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

//  Edit user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (editFormData) => {
    try {
      const response = await api.put(
        `/edituser/${editFormData.id}`,
        editFormData.formData
      );
      console.log("res", response);

      const payload = {
        data: editFormData.formData,
        id: editFormData.id,
      };

      return payload;
    } catch (err) {
      console.error("Error", err.response.data);
      return err.response.data;
    }
  }
);
