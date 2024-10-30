import { logout } from "@/lib/api";
import Cookies from "js-cookie";

export async function GET() {
  try {
    const token = Cookies.get("token");

    if (token) {
      Cookies.remove("token");
      Cookies.remove("user");
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
