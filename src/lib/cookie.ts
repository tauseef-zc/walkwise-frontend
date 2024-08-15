"use server";
import { cookies } from "next/headers";

export const getCookie = (name: string) => {
    return cookies().get(name)?.value ?? null;
}