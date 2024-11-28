import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { createSearchUrl } from "./tourActions";
import { get } from "@/lib/restApi";
import { GuidePagination } from "@/data/tours";

export const searchGuides = async (data: any) => {
  const searchParams = await createSearchUrl(data);
  const token = await getCookie("token", { cookies });
  const response = await get("/guides/search?" + searchParams, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response as unknown as GuidePagination;
};