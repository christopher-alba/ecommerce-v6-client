import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ORIGIN_URI, // Set base URL
  timeout: 5000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to attach tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - redirecting to login...");
      // Optionally redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
