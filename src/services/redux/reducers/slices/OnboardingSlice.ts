"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface OnboardingState {
  step: number;
  data: {
    role: string;
    expertise: Array<string>;
    bio: string;
    experience: number | null;
    tourism_license?: FileList | null;
    registration_certificate?: FileList | null;
    accessibility: string[];
    interests: string[];
    dietary_restrictions: string;
    gender: number | null;
    nationality: string;
    passport_image: FileList | null;
  };
  error: "";
}

const initialState: OnboardingState = {
  step: 1,
  data: {
    role: "traveler",
    expertise: [],
    bio: "",
    experience: null,
    tourism_license: null,
    registration_certificate: null,
    accessibility: [],
    interests: [],
    dietary_restrictions: "",
    gender: 1,
    nationality: "",
    passport_image: null,
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
    clearOnboardingData: (state: OnboardingState) => {
      state = initialState;
    },
    setError: (state: OnboardingState, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStep, setData, clearOnboardingData, setError } =
  onboardingProcess.actions;

export default onboardingProcess.reducer;
