import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "@/hooks/useApi";
import {
  clearCredentials,
  setCredentials,
  User,
} from "../redux/reducers/slices/AuthSlice";
import { useAppSelector } from "../redux/hooks";
import axios from "axios";
import { RegisterFormInput } from "@/types/formData";
// Adjust this import based on your Redux setup


interface LoginResponse {
  user: User;
  accessToken: string;
}

interface RegisterResponse {
  user: User;
  accessToken: string;
  message: string;
}

interface DataResponse {
  data: {
    message?: string;
    user?: User;
    accessToken?: string;
  };
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const api = useApi();

  const checkAuth = async () => {
      await getUser()
        .then((res) => {
          console.log(res);
          dispatch(setCredentials(res));
        })
        .catch((err) => {
          dispatch(clearCredentials());
        });
  };

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResponse> => {
      try {
        const response = await axios.post<LoginResponse>("/api/login", {
          email,
          password,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const register = useCallback(
    async (data: RegisterFormInput): Promise<RegisterResponse> => {
      try {
        const response = await axios.post<RegisterResponse>(
          "/api/register",
          data
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const sendVerification = useCallback(
    async (email: string): Promise<DataResponse> => {
      try {
        const response = await api.post<DataResponse>(
          "/auth/email/send-verification",
          { email }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [api]
  );

  const verifyUser = useCallback(
    async (data: {
      email: string;
      otp: string;
      verify_email: boolean;
    }): Promise<DataResponse> => {
      try {
        const response = await api.post<DataResponse>("/auth/verify", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [api]
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await axios.get("/api/logout");
    } catch (error) {
      throw error;
    }
  }, []);

  const getUser = useCallback(async (): Promise<DataResponse> => {
    try {
      const response = await axios.get<DataResponse>("/api/user");
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    login,
    register,
    logout,
    getUser,
    checkAuth,
    sendVerification,
    verifyUser,
  };
};
