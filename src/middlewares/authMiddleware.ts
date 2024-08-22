import { NextRequest } from "next/server";

export const authPath = ["/dashboard", "/dashboard/create-tour", "/onboarding"];
export const authGuestPath = ["/login", "/register", "/otp-verify"];

export const checkAuth = (
  user: any,
  token: string | undefined,
  pathName: string,
  request: NextRequest
) => {
  const redirectPath =
    user?.user_type === "traveler" ? "/my-account" : "/dashboard";

  if (token) {
    if (
      user?.verified === true &&
      user?.onboarding === false &&
      (authGuestPath.includes(pathName) || pathName.startsWith("/onboarding"))
    ) {
      return new URL(redirectPath, request.url);
    }

    if (
      user?.verified === true &&
      user?.onboarding === false &&
      user?.user_type === "traveler" &&
      pathName.startsWith("/dashboard")
    ) {
      return new URL("/my-account", request.url);
    }

    if (
      user?.verified === true &&
      user?.onboarding === false &&
      user?.user_type === "guide" &&
      pathName.startsWith("/my-account")
    ) {
      return new URL("/dashboard", request.url);
    }

    if (user && user?.verified === true && pathName.startsWith("/otp-verify")) {
      return new URL(redirectPath, request.url);
    }

    if (user && user?.verified === false && authPath.includes(pathName)) {
      return new URL("/otp-verify?email=" + user.email, request.url);
    }

    if (
      user?.verified === true &&
      user?.onboarding === true &&
      (pathName.startsWith("/dashboard") || pathName.startsWith("/my-account"))
    ) {
      return new URL("/onboarding", request.url);
    }
  }
  return null;
};
