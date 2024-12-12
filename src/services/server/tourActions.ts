"use server";
import { TourCategory, TourPagination } from "@/data/tours";
import { Booking, Payment } from "@/data/types";
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

export const getTourCategory = async (slug: string, page: number = 1) => {
  try {
    const response = await get("/tour-categories/" + slug + "?page=" + page);
    return response as unknown as TourCategory;
  } catch (error) {
    return null;
  }
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


export const getTourById = async (id: number) => {
  try {
    const response = await api.get("/tours/get/" + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPayment = async (
  paymentId: string
): Promise<Payment | null> => {
  try {
    const response = await get(`/payments/${paymentId}`);
    if (!response || typeof response !== "object" || !("id" in response)) {
      return null; // Validate response structure
    }
    return response as unknown as Payment;
  } catch (error) {
    console.error("Failed to fetch payment:", error);
    return null;
  }
};


export const getBooking = async (
  paymentId: number
): Promise<Booking | null> => {
  try {
    return (await get("/guides/bookings/" + paymentId)).data as unknown as Booking;
  } catch (error) {
    return null;
  }
};
