"use client";
import { createSlice } from "@reduxjs/toolkit";
import { File } from "buffer";

export interface OnboardingState {
  step: number;
  data: {
    role: string;
    expertise: Array<string>;
    about: string;
    experience: number;
    tourism_license?: File;
    registration_certificate?: File;
  };
  error: "";
}

const initialState: OnboardingState = {
  step: 1,
  data: {
    role: "",
    expertise: [],
    about: "",
    experience: 0
  },
  error: "",
};

const onboardingProcess = createSlice({
  name: "onboardingUser",
  initialState,
  reducers: {
    setStep: (state: OnboardingState, action) => {
      state.step = action.payload;
    },
    setData: (state: OnboardingState, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    setError: (state: OnboardingState, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStep, setData, setError } = onboardingProcess.actions;

export default onboardingProcess.reducer;
