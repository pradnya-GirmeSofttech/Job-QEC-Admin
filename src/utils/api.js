import axios from "axios";
// export const url = "https://job-qec.onrender.com/api/v1";

// Create an Axios instance
export const api = axios.create({
  baseURL: "https://job-qec.onrender.com/api/v1",
  // baseURL: "https://dev.myfitmantra.com/api/trainer",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to update the Authorization header with the token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      // Handle AsyncStorage errors gracefully
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
