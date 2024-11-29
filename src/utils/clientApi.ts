import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL + "" + process.env.NEXT_PUBLIC_API_SUFFIX,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for requests or responses
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token") || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
