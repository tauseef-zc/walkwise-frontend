import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authGuestPath = ["/login", "/register", "/otp-verify"];
const authPath = ["/dashboard", "/onboarding"];

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const user = JSON.parse(request.cookies.get("user")?.value || "{}");

  if (token) {

    if (
      user?.verified === true &&
      user?.onboarding === false &&
      (authGuestPath.includes(pathName) || pathName.startsWith("/onboarding"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (user && user?.verified === true && pathName.startsWith("/otp-verify")) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    if (user && user?.verified === false && authPath.includes(pathName)) {
      return NextResponse.redirect(
        new URL("/otp-verify?email=" + user.email, request.url)
      );
    }

    if (
      user?.verified === true &&
      user?.onboarding === true &&
      pathName.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
    
  }

  if (!token && authPath.includes(pathName)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
