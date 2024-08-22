import { combineReducers } from "@reduxjs/toolkit";
import OnboardingReducer, { OnboardingState } from "./slices/OnboardingSlice";
import AuthReducer, { AuthState } from "./slices/AuthSlice";
import TourCategoryReducer, { TourCategoryState } from "./slices/TourCategorySlice";

export interface RootState {
    onboarding: OnboardingState;
    auth: AuthState;
    site_data: {
        categories: TourCategoryState
    };
} 

const rootReducer = combineReducers({
  onboarding: OnboardingReducer,
  auth: AuthReducer,
  site_data: combineReducers({
    categories: TourCategoryReducer,
  }),
});

export default rootReducer;