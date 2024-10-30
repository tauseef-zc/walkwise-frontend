import { NextRequest, NextResponse } from "next/server";
import { login } from "../../../lib/api";
import Cookies from "js-cookie";

export async function POST(request: NextRequest) {
  try {

    const { email, password } = await request.json();
    const { data } = await login(email, password);

    Cookies.set("user", JSON.stringify(data.user));
    Cookies.set("token", data.accessToken || '');

    return new Response(JSON.stringify(data), {
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}
