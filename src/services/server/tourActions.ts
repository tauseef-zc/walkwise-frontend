"use server";
import { TourCategory, TourPagination } from "@/data/tours";
import api, { get } from "@/lib/restApi";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const searchTours = async (data: any) => {
  const searchParams = await createSearchUrl(data);
  const token = await getCookie("token", { cookies });
  const response = await get("/search-tours?" + searchParams, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response as unknown as TourPagination;
};

export const getTourCategory = async (slug: string) => {
  const response = await get("/tour-categories/" + slug);
  return response as unknown as TourCategory;
};

export const createSearchUrl = async (obj: any) => {
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
  return await urlSearchParams.toString();
};

export const getTour = async (slug: string) => {
  try {
    const response = await api.get("/tours/" + slug);
    return response.data;
  } catch (error) {
    throw error;
  }
};
