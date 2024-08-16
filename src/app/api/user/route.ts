import { AuthResponse, getUserProfile } from "@/lib/api";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (token) {
      const { data } = await getUserProfile(token);
      cookies().set("user", JSON.stringify(data.user));
      data.accessToken = token;

      return new Response(JSON.stringify({data}), {
        status: 200,
      });
    }

    return new Response("Unauthorized", {
      status: 401,
    });
  } catch (error: any) {
    return new Response(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}
