import { AuthResponse, getUserProfile } from "@/lib/api";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    const user = cookies().get("user")?.value;
    let response = {} as AuthResponse;

    if (token) {
      if (!user) {
        const { data } = await getUserProfile(token);
        cookies().set("user", JSON.stringify(data.user));

        return new Response(JSON.stringify(data), {
          status: 200,
        });

      } else {
        response = {
            data: {
                user: JSON.parse(user),
                accessToken: token
            }
        }
      }

      return new Response(JSON.stringify(response), {
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
