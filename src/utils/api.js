import axios from "axios";
export const url = "http://localhost:4000/api/v1";

const instance = axios.create({
  withCredentials: true,
});

export default instance;
