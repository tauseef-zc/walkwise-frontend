import { logout } from "@/lib/api";
import { cookies } from "next/headers";


export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if(token){
        cookies().delete("token");
        cookies().delete("user");
        await logout(token);
    }

    return new Response("logged out", {
      status: 200
    });

  } catch (error: any) {
    return new Response(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}