import { User } from "@/services/redux/reducers/slices/AuthSlice";
import { RegisterFormInput } from "@/types/formData";
import axios from "axios";

export interface AuthResponse {
  data: {
    user?: User;
    accessToken?: string | object;
  };
}

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL + "" + process.env.NEXT_PUBLIC_API_SUFFIX,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const register = async ( 
  payload: RegisterFormInput
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

export const getUserProfile = async (token: string): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const logout = async (token: string) => {
  const response = await api.get("/auth/logout", { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
