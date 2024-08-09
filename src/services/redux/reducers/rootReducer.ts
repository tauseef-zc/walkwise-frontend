import { combineReducers } from "@reduxjs/toolkit";
import OnboardingReducer from "./slices/OnboardingSlice";
import AuthReducer from "./slices/AuthSlice";

const rootReducer = combineReducers({
    onboarding: OnboardingReducer,
    auth: AuthReducer
});

export default rootReducer;