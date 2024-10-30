import { TourCategory, TourPagination } from "@/data/tours";
import api from "@/lib/restApi";

export const searchTours = async (data: any) => {
  const searchParams = createSearchUrl(data);
  const response = await api.get<any>("/search-tours?" + searchParams);
  return response as unknown as TourPagination;
};

export const getTourCategory = async (slug: string) => {
  const response = await api.get<any>("/tour-categories/" + slug);
  return response as unknown as TourCategory;
};

export const createSearchUrl = (obj: any) => {
  const urlSearchParams = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((val) => urlSearchParams.append(key, val));
      } else {
        urlSearchParams.append(key, value);
      }
    }
  }
  return urlSearchParams.toString();
};
