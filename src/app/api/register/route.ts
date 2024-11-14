import { NextRequest, NextResponse } from "next/server";
import { register } from "../../../lib/api";
import { setCookie } from "cookies-next";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    payload.password_confirmation = payload.password;
    
    const { data } = await register(payload);

    setCookie("user", JSON.stringify(data.user));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${data.accessToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}
