"use client";
import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../shared/ButtonPrimary';
import Input from '../shared/Input';
import { useForm } from 'react-hook-form';
import { RegisterFormInput, RegisterRequestError } from '@/types/formData';
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/services/app/AuthService';
import { setCredentials } from '@/services/redux/reducers/slices/AuthSlice';
import { toast } from 'react-toastify';

const RegisterForm = () => {
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
      data.password_confirmation = data.password;
      await registerUser(data)
        .then((res) => {
          dispatch(setCredentials(res.data));
          toast("Your account is created successfully!", {
            type: "success",
          });
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

    useEffect(() => {
      setLoading(false);
      if (isAuthenticated && user !== null && !user.verified) {
        replace("/otp-verify?email=" + user.email);
      } else if (isAuthenticated && user !== null && user.onboarding) {
        replace("/onboarding");
      }
    }, [isAuthenticated, user, replace]);

  return (
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
          <span className="text-red-500 text-xs">Please enter a Last Name</span>
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
  );
}

export default RegisterForm
