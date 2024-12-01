"use client";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import Input from "@/components/shared/Input";
import Link from "next/link";
import { useAuth } from "@/services/app/AuthService";
import { LoginFormInput, LoginRequestError } from "@/types/formData";
import { setCredentials } from "@/services/redux/reducers/slices/AuthSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { isAuthenticated, user } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const { replace, prefetch } = useRouter();
  const [serverError, setServerError] = useState<LoginRequestError>({} as LoginRequestError);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const onSubmit = async (data: LoginFormInput) => {
    setLoading(true);
    setServerError({} as LoginRequestError);

    prefetch("/otp-verify?email=" + data.email);
    prefetch("/onboarding");
    prefetch("/my-account");
    prefetch("/dashboard");

    await login(data.email, data.password)
      .then((res) => {
        dispatch(setCredentials(res.data));
        toast(
          "Welcome, " + res.data?.user?.name + "! Your login was successful",
          {
            type: "success",
          }
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const { response } = error;

        if (response?.status === 400) {
          replace("/otp-verify?email=" + data.email);
        }

        const codes = [403, 422];
        if (codes.includes(response?.status)) {
          setServerError(response?.data);
        }
      });
  };

  useEffect(() => {
    if (isAuthenticated && user !== null && !user.verified) {
      replace("/otp-verify?email=" + user.email);
    }

    if (isAuthenticated && user !== null && user.onboarding) {
      replace("/onboarding");
    }

    if (isAuthenticated && user !== null && user.verified && !user.onboarding) {
      const redirect =
        user.user_type === "traveler" ? "/my-account" : "/dashboard";
      replace(redirect);
    }
  }, [isAuthenticated, user, replace]);

  return (
    <form
      className="grid grid-cols-1 gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {serverError?.error && (
        <div className="text-red-400 text-sm text-center p-2 border border-red-300 bg-red-50 border-opacity-20 rounded-md">
          {serverError?.error}
        </div>
      )}
      <div className="block">
        <label className="text-neutral-800 dark:text-neutral-200">
          Email address
        </label>
        <Input
          type="email"
          placeholder="example@example.com"
          className={
            "mt-1 " +
            (errors.email || serverError?.errors?.email ? "border-red-500" : "")
          }
          autoComplete="email"
          autoFocus
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {(errors.email || serverError?.errors?.email) && (
          <label className="text-red-500 text-xs">
            Please enter a valid email address
          </label>
        )}
      </div>
      <div className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Password
          <Link href="/forgot-password" className="text-sm underline font-medium">
            Forgot password?
          </Link>
        </span>
        <Input
          type="password"
          {...register("password", {
            required: true,
          })}
          className={
            "mt-1 " +
            (errors.password || serverError?.errors?.password
              ? "border-red-500"
              : "")
          }
        />
        {(errors.password || serverError?.errors?.password) && (
          <span className="text-red-500 text-xs">
            Please enter a valid password
          </span>
        )}
      </div>
      <ButtonPrimary type="submit" loading={loading}>
        Continue
      </ButtonPrimary>
    </form>
  );
};

export default LoginForm;
