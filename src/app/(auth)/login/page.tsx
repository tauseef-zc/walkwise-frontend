"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/services/redux/hooks";
import LoginForm from "@/components/auth/LoginForm";


const Login = () => {
  const { isAuthenticated, user } = useAppSelector((state: any) => state.auth);
  const { replace } = useRouter();

  useEffect(() => {
    if (isAuthenticated && user !== null && !user.verified) {
      replace("/otp-verify?email=" + user.email);
    }

    if (isAuthenticated && user !== null && user.onboarding) {
      replace("/onboarding");
    }

    if (isAuthenticated && user !== null && user.verified &&!user.onboarding) {
      const redirect = user.user_type === "traveler" ? "/my-account" : "/dashboard";
      replace(redirect);
    }
  }, [isAuthenticated, user, replace]);

  return (
    <div className="nc-PageLogin" >
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <LoginForm />
          {/* ==== */}
          <div className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link href="/register" className="font-semibold underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;