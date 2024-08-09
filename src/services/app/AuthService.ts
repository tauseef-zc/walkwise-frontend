import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "@/hooks/useApi";
import { setToken, clearCredentials, setCredentials } from "../redux/reducers/slices/AuthSlice";
// Adjust this import based on your Redux setup

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const api = useApi();

  const login = useCallback(
    async (email: string, password: string): Promise<User> => {
      try {
        await api.get("/sanctum/csrf-cookie");
        const response = await api.post<LoginResponse>("/login", {
          email,
          password,
        });
        dispatch(setCredentials(response.data));
        return response.data.user;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    [api, dispatch]
  );

  const register = useCallback(
    async (data: RegisterData): Promise<User> => {
      try {
        await api.get("/sanctum/csrf-cookie");
        const response = await api.post<LoginResponse>("/register", data);
        dispatch(setToken(response.data.token));
        return response.data.user;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    [api, dispatch]
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await api.post("/logout");
      dispatch(clearCredentials());
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }, [api, dispatch]);

  return { login, register, logout };
};
