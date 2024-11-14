"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCookie,
  getCookies,
  setCookie,
  deleteCookie,
  hasCookie,
} from "cookies-next";

export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
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
  other_lang: string[];
  newsletter: boolean;
  created_at: string;
  updated_at: string;
  onboarding: boolean;
  user_type: string;
  resource: {
    accessibility?: string[];
    interests?: string[];
    phone: string;
    bio?: string;
    dietary_restrictions?: string;
    experience?: number;
    expertise?: string[];
    has_vehicle?: boolean;
    documents?: string[];
    passport_image?: string;
    nationality: string;
    emergency_contact?: {
      name: string;
      phone: string;
      email: string;
    };

  }
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  onboarding: boolean;
  verified: boolean;
  user_type: string;
}

const initialState: AuthState = {
  user: hasCookie("user") ? JSON.parse(getCookie("user")!) : null,
  token: getCookie("token") ?? null,
  isAuthenticated: getCookie("token") ? true : false,
  onboarding: false,
  verified: false,
  user_type: "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user?: User; accessToken?: string }>
    ) => {
      const { user, accessToken: token } = action.payload;
      state.user = user ?? state.user;

      if (state.user) {
        setCookie("user", JSON.stringify(state.user));
      }
      
      if(token){
        state.token = token ? token : state.token;
        setCookie("token", token);
      }
      state.verified = user?.verified ?? state.verified;
      state.isAuthenticated = true;
      state.onboarding = user?.onboarding ?? state.onboarding;
      state.user_type = user?.user_type ?? state.user_type;
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
      state.onboarding = true;
      state.user_type = "user";
      deleteCookie("token");
      deleteCookie("user");
    },
  },
});

export const { setCredentials, setToken, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
