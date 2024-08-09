import { useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RootState } from "@/services/redux/store/store"; // Adjust this import based on your Redux setup
import { useAppSelector } from "@/services/redux/hooks";

interface ApiHook {
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
}

export const useApi = (): ApiHook => {
  
  const token = useAppSelector((state: RootState) => state.auth.token);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  const get = useCallback(
    <T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return instance.get<T>(url, config);
    },
    [instance]
  );

  const post = useCallback(
    <T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return instance.post<T>(url, data, config);
    },
    [instance]
  );

  const put = useCallback(
    <T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return instance.put<T>(url, data, config);
    },
    [instance]
  );

  const del = useCallback(
    <T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return instance.delete<T>(url, config);
    },
    [instance]
  );

  return { get, post, put, delete: del };
};
