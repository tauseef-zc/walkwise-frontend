"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  status: {
    label: string;
    value: number;
  };
  gender: {
    label: string;
    value: number;
  };
  nationality: string;
  primary_lang: string;
  other_lang: string;
  newsletter: boolean;
  created_at: string;
  updated_at: string;
  onboarding: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  onboarding: boolean;
  verified: boolean;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("token") ?? null,
  isAuthenticated: Cookies.get("token") ? true : false,
  onboarding: false,
  verified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ data: { user?: User; accessToken?: string } }>
    ) => {
      const { user, accessToken: token } = action.payload.data;
      state.user = user ?? state.user;
      state.verified = user?.verified ?? state.verified;
      if(token){
        state.token = token ? token : state.token;
        Cookies.set("token", token);
      }
      state.isAuthenticated = true;
      state.onboarding = user?.onboarding ?? state.onboarding;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.verified = false;
      state.isAuthenticated = false;
      Cookies.remove("token");
    },
  },
});

export const { setCredentials, setToken, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
