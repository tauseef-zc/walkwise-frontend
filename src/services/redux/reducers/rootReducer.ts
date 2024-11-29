import { combineReducers } from "@reduxjs/toolkit";
import SearchReducer, { SearchState } from "./slices/SearchSlice";
import OnboardingReducer, { OnboardingState } from "./slices/OnboardingSlice";
import AuthReducer, { AuthState } from "./slices/AuthSlice";
import TourCategoryReducer, {
  TourCategoryState,
} from "./slices/TourCategorySlice";
import GuideTourReducer, { GuideTourState } from "./slices/GuideToursSlice";
import LikedTourReducer, { LikedTourState } from "./slices/LikedToursSlice";
import CheckoutReducer, { CheckoutState } from "./slices/CheckoutSlice";
import MessageReducer, { ChatState } from "./slices/MessagesSlice";

export interface RootState {
  search: SearchState;
  onboarding: OnboardingState;
  auth: AuthState;
  site_data: {
    categories: TourCategoryState;
  };
  guide: {
    tours: GuideTourState;
  };
  user: {
    liked_tours: LikedTourState;
  };
  checkout: CheckoutState;
  messages: ChatState;
}

const rootReducer = combineReducers({
  search: SearchReducer,
  onboarding: OnboardingReducer,
  auth: AuthReducer,
  checkout: CheckoutReducer,
  site_data: combineReducers({
    categories: TourCategoryReducer,
  }),
  guide: combineReducers({
    tours: GuideTourReducer,
  }),
  user: combineReducers({
    liked_tours: LikedTourReducer,
  }),
  messages: MessageReducer,
});

export default rootReducer;
