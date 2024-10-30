import { getUserProfile } from "@/lib/api";
import Cookies from "js-cookie";


export async function GET() {
  try {
    const token = Cookies.get("token");
    console.log({ token });

    if (token) {
      const { data } = await getUserProfile(token);
      Cookies.set("user", JSON.stringify(data.user));
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
