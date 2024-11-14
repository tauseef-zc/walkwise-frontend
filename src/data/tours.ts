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
}

export interface Tour {
  id: number;
  title: string;
  slug: string;
  images: TourImages[];
  category: TourCategory;
  guide: TourGuide;
  price: number;
  updated_at: string;
  saleOff?: string | null;
  isAds?: boolean | null;
  is_liked?: boolean;
  reviewStart?: number;
  reviewCount?: number;
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
