"use client";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import Input from "@/components/shared/Input";
import Link from "next/link";
import { useAuth } from "@/services/app/AuthService";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RegisterFormInput, RegisterRequestError } from "@/types/formData";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { setCredentials } from "@/services/redux/reducers/slices/AuthSlice";
import { toast } from "react-toastify";


const Register = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [serverError, setServerError] = useState(
    ({} as RegisterRequestError) || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { register: registerUser } = useAuth();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>();

  const onSubmit = async (data: RegisterFormInput) => {
    setLoading(true);
    setServerError({} as RegisterRequestError);
    await registerUser(data).then((res) => {
      dispatch(setCredentials({ data: res }));
      toast("Your account is created successfully!", {
        type: "success",
      });
    }).catch((error) => {
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

  useEffect(() => {
    setLoading(false);
    if (isAuthenticated && user !== null && !user.verified) {
      replace("/otp-verify?email=" + user.email);
    }else if (isAuthenticated && user !== null && user.onboarding) {
      replace("/onboarding");
    }
  }, [isAuthenticated, user, replace]);

  return (
    <div className={`nc-PageSignUp`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign up
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <form
            className="grid grid-cols-1 gap-6"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input
                type="text"
                placeholder="John"
                className="mt-1"
                {...register("first_name", { required: true })}
              />
              {(errors.first_name || serverError?.errors?.first_name) && (
                <span className="text-red-500 text-xs">
                  Please enter a First Name
                </span>
              )}
            </div>
            <div className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Last Name
              </span>
              <Input
                type="text"
                placeholder="Doe"
                className="mt-1"
                {...register("last_name", { required: true })}
              />
              {(errors.last_name || serverError?.errors?.last_name) && (
                <span className="text-red-500 text-xs">
                  Please enter a Last Name
                </span>
              )}
            </div>
            <div className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {(errors.email || serverError?.errors?.email) && (
                <span className="text-red-500 text-xs">
                  Please enter a valid email address
                </span>
              )}
            </div>
            <div className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                {...register("password", { required: true })}
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

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link href="/login" className="font-semibold underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
