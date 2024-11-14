import { NextRequest, NextResponse } from "next/server";
import { login } from "../../../lib/api";
import { setCookie } from "cookies-next";

export async function POST(request: NextRequest) {
  try {

    const { email, password } = await request.json();
    const { data } = await login(email, password);

    setCookie("user", JSON.stringify(data.user));
    setCookie("token", data.accessToken || "");

    return new Response(JSON.stringify(data), {
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}
