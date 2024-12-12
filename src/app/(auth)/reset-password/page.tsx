"use client";
import FormItem from "@/components/onboarding/FormItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import Input from "@/components/shared/Input";
import { useAuth } from "@/services/app/AuthService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface PasswordForm {
  password: string;
  password_confirmation: string;
  email: string;
  token: string;
}

const ResetPasswordPage = ({ searchParams }: { searchParams: any }) => {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { push } = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>();

  const password = watch("password");

  const handleResetPassword = async (data: PasswordForm, e: any) => {
    try {
      data.email = searchParams?.email || "";
      data.token = searchParams?.token || "";
      setLoading(true);
      await resetPassword(data).then((response) => {
        toast("Thank you, " + response.data?.message, {
          type: "success",
        });

        setTimeout(() => {
          setLoading(false);
          push("/login");
        }, 2000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nc-PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(handleResetPassword)}
          >
            <div className="block">
              <FormItem label="New Password" error={errors.password}>
                <Input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                />
              </FormItem>
            </div>
            <div className="block">
              <FormItem label="Confirm Password" error={errors.password}>
                <Input
                  {...register("password_confirmation", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type="password"
                />
              </FormItem>
            </div>
            <ButtonPrimary type="submit" loading={loading}>
              Submit
            </ButtonPrimary>
          </form>
          {/* ==== */}
          <div className="block text-center text-neutral-700 dark:text-neutral-300">
            <Link href="/login" className="font-semibold underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
