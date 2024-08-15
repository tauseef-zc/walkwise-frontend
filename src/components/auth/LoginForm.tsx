"use client";
import { useAuth } from "@/services/app/AuthService";
import { LoginFormInput, LoginRequestError } from "@/types/formData";
import { setCredentials } from "@/services/redux/reducers/slices/AuthSlice";
import { toast } from "react-toastify";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import Input from "@/components/shared/Input";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/services/redux/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { replace } = useRouter();
  const [serverError, setServerError] = useState(
    ({} as LoginRequestError) || null
  );
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

    await login(data.email, data.password)
      .then((res) => {
        dispatch(setCredentials({ data: res }));
        toast("Welcome, " + res.user.name + "! Your login was successful", {
          type: "success",
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const { response } = error;

        if (response?.status === 400) {
          replace("/otp-verify?email=" + data.email);
        }

        const codes = [401, 422];
        if (codes.includes(response?.status)) {
          setServerError(response?.data);
        }
      });
  };

  return (
    <form
      className="grid grid-cols-1 gap-6"
      action="#"
      method="post"
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
          <Link href="/login" className="text-sm underline font-medium">
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
