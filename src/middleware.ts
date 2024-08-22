import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authPath, checkAuth } from "./middlewares/authMiddleware";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const user = JSON.parse(request.cookies.get("user")?.value || "{}");

  const authRedirect = checkAuth(user, token, pathName, request);

  if (authRedirect) {
    return NextResponse.redirect(authRedirect);
  }

  if (!token && authPath.includes(pathName)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
