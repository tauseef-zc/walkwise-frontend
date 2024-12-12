import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "@/hooks/useApi";
import { setCredentials, User } from "../redux/reducers/slices/AuthSlice";
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

  const checkAuth = useCallback(async () => {
    await getUser().then((res) => {
      dispatch(setCredentials(res.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const login = useCallback(
    async (email: string, password: string): Promise<DataResponse> => {
      try {
        const response = await api.post<DataResponse>("/auth/login", {
          email,
          password,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [api]
  );

  const register = useCallback(
    async (data: RegisterFormInput): Promise<DataResponse> => {
      try {
        const response = await api.post<DataResponse>("/auth/register", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [api]
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
      skip_user?: boolean;
    }): Promise<DataResponse> => {
      try {
        const response = await api.post<DataResponse>("/auth/verify", data);
        if (data.skip_user == false) {
          await checkAuth();
        }
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [api, checkAuth]
  );

  const forgotPassword = useCallback(
    async (email: string): Promise<DataResponse> => {
      try {
        const response = await api.post<DataResponse>("/auth/forgot-password", {
          email,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [api]
  );

  const resetPassword = useCallback(
    async (data: {
      email: string;
      password: string;
      password_confirmation: string;
      token: string;
    }): Promise<DataResponse> => {
      try {
        const response = await api.put<DataResponse>(
          "/auth/reset-password",
          data,
          {
            headers: {
              "Authorization": `Bearer ${data.token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [api]
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      throw error;
    }
  }, [api]);

  const getUser = useCallback(async (): Promise<DataResponse> => {
    try {
      const response = await api.get<DataResponse>("/auth/user");
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [api]);

  return {
    login,
    register,
    logout,
    getUser,
    checkAuth,
    forgotPassword,
    resetPassword,
    sendVerification,
    verifyUser,
  };
};
