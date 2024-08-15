import { combineReducers } from "@reduxjs/toolkit";
import OnboardingReducer, { OnboardingState } from "./slices/OnboardingSlice";
import AuthReducer, { AuthState } from "./slices/AuthSlice";

export interface RootState {
    onboarding: OnboardingState;
    auth: AuthState;
} 

const rootReducer = combineReducers({
    onboarding: OnboardingReducer,
    auth: AuthReducer
});

export default rootReducer;