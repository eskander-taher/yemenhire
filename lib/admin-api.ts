import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

export const BASE_URL = isDev
  ? "http://localhost:5000/api"
  : "https://api.yemenhires.com/api";

export const adminAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // 60 seconds timeout for file uploads
  maxContentLength: 50 * 1024 * 1024, // 50MB max request size
  maxBodyLength: 50 * 1024 * 1024, // 50MB max body size
});

// Request interceptor to add token
adminAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
adminAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, clear auth and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin-token");
        localStorage.removeItem("admin-authenticated");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);



