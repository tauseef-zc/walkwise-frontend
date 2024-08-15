import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authGuestPath = ["/login", "/register", "/otp-verify"];
const authPath = ["/dashboard", "/onboarding"];

export function middleware(request: NextRequest) {

  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const user = JSON.parse(request.cookies.get("user")?.value || "{}");

  if (token && authGuestPath.includes(pathName)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && authPath.includes(pathName)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user?.onboarding === true && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}
