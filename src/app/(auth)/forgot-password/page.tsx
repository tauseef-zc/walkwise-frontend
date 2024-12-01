"use client";
import Link from "next/link";
import FormItem from "@/components/onboarding/FormItem";
import Input from "@/components/shared/Input";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useAuth } from "@/services/app/AuthService";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
}

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleForgotPassword = async (data: LoginForm, e: any) => {
    try {
      await forgotPassword(data.email).then((res) => {
        push("/forgot-password/verify?email=" + data.email);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nc-PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(handleForgotPassword)}
          >
            <div className="block">
              <FormItem label="Email address" error={errors.email}>
                <Input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email address"
                  type="email"
                />
              </FormItem>
            </div>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
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

export default ForgotPassword;
