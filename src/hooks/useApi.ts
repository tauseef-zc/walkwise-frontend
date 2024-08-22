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
  const path = "/" + process.env.NEXT_PUBLIC_API_SUFFIX;

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  });

  const apiUrl = useCallback(
    (url: string): string => {
      return path + url;
    },
    [path]
  );

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
      return instance.get<T>(apiUrl(url), config);
    },
    [instance, apiUrl]
  );

  const post = useCallback(
    <T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return instance.post<T>(apiUrl(url), data, config);
    },
    [instance, apiUrl]
  );

  const put = useCallback(
    <T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return instance.put<T>(apiUrl(url), data, config);
    },
    [instance, apiUrl]
  );

  const del = useCallback(
    <T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return instance.delete<T>(apiUrl(url), config);
    },
    [instance, apiUrl]
  );

  
  return { get, post, put, delete: del };
};
