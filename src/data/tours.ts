export interface TourImages {
  id: string;
  image: string;
  thumbnail: string;
}

export interface TourCategory {
  id: number;
  category: string;
  slug: string;
  info?: string;
  image: string;
  tours_count?: number;
}

export interface TourGuide {
  id: string;
  name: string;
  phone: string;
  rating: number;
  user_id: number;
  verified_at: string;
  user?: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    verified: boolean;
    avatar?: string;
    nationality?: string;
    primary_lang?: string;
    other_lang?: string[];
    onboarding?: boolean;
    user_type?: string;
    resource?: string;
    created_at?: string;
    updated_at?: string;
  }
}

export interface Location {
  name: string;
  address: string;
  geocode: {
    lat: number;
    lng: number;
  };
  place_id: number;
}

export interface TourDay {
  title: string;
  itinerary: string;
  meal_plan: string;
  accommodation: string;
  location: Location;
  order: number;
}

export interface TourAvailability {
  id: number;
  from: Date;
  to: Date;
}

export interface Tour {
  id: number;
  title: string;
  slug: string;
  images: TourImages[];
  category: TourCategory;
  guide: TourGuide;
  location: Location;
  start_location: Location;
  end_location: Location;
  tour_days: TourDay[];
  tour_availability?: TourAvailability[];
  price: number;
  updated_at: string;
  saleOff?: string | null;
  isAds?: boolean | null;
  is_liked?: boolean;
  reviewStart?: number;
  reviewCount?: number;
  overview?: string;
  inclusions?: string;
  exclusions?: string;
  conditions?: string;
  max_packs?: number;
}

export interface FeaturedTour extends Tour {}

export interface TourUrl {
  label: string;
  url: string;
  active?: boolean;
}

export interface TourMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: TourUrl[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface TourPagination {
  data: Tour[];
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: TourMeta;
}

export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}

export interface TourDates {
  from: Date | null;
  to: Date | null;
}