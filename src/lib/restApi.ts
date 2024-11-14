"use server";
import { cookies } from "next/headers";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { useCallback } from "react";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL + "" + process.env.NEXT_PUBLIC_API_SUFFIX,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = getCookie("token", { cookies }) || null;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use((response) => {
  return response.data;
});

// Get function
export const get = async (endpoint: string, params = {}) => {
  try {
    const response = await instance.get(endpoint, { params });
    return response; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default instance;
