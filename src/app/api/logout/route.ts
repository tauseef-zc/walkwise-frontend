import { logout } from "@/lib/api";
import { deleteCookie, getCookie } from "cookies-next";

export async function GET() {
  try {
    const token = getCookie("token");

    if (token) {
      deleteCookie("token");
      deleteCookie("user");
      await logout(token);
    }

    return new Response("logged out", {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}
