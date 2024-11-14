import { combineReducers } from "@reduxjs/toolkit";
import OnboardingReducer, { OnboardingState } from "./slices/OnboardingSlice";
import AuthReducer, { AuthState } from "./slices/AuthSlice";
import TourCategoryReducer, { TourCategoryState } from "./slices/TourCategorySlice";
import GuideTourReducer, { GuideTourState } from "./slices/GuideToursSlice";
import LikedTourReducer, { LikedTourState } from "./slices/LikedToursSlice";

export interface RootState {
    onboarding: OnboardingState;
    auth: AuthState;
    site_data: {
        categories: TourCategoryState,
    };
    guide: {
        tours: GuideTourState
    },
    user: {
      liked_tours: LikedTourState
    }
} 

const rootReducer = combineReducers({
  onboarding: OnboardingReducer,
  auth: AuthReducer,
  site_data: combineReducers({
    categories: TourCategoryReducer,
  }),
  guide: combineReducers({
    tours: GuideTourReducer,
  }),
  user: combineReducers({
    liked_tours: LikedTourReducer
  })
});

export default rootReducer;