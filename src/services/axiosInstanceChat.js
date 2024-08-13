import axios from "axios";
import authService from "./authService";

const axiosInstanceChat = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceChat.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceChat.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.logout();
      window.location.href = "/"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceChat;
