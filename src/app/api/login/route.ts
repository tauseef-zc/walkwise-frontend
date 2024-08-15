import { NextRequest, NextResponse } from "next/server";
import { login } from "../../../lib/api";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {

    const { email, password } = await request.json();
    const { data } = await login(email, password);

    cookies().set("user", JSON.stringify(data.user));

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
