import { getUserProfile } from "@/lib/api";
import { getCookie, setCookie } from "cookies-next";


export async function GET() {
  try {
    const token = getCookie("token");

    if (token) {
      const { data } = await getUserProfile(token);
      setCookie("user", JSON.stringify(data.user));
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
