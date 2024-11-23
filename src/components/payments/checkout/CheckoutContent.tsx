"use client";
import PhoneInput from "@/components/inputs/PhoneInput";
import FormItem from "@/components/onboarding/FormItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import Input from "@/components/shared/Input";
import { useAppDispatch } from "@/services/redux/hooks";
import { updateCheckout } from "@/services/redux/reducers/slices/CheckoutSlice";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  children?: React.ReactNode;
}

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

const CheckoutContent: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [billing, setBilling] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(updateCheckout({ billingDetails: data }));
    setBilling(true);
  };

  return (
    <>
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h3 className="text-3xl lg:text-3xl font-semibold">
          Confirm and payment
        </h3>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <h3 className="text-2xl font-semibold flex justify-between align-middle">
            Billing details
            {billing && (
              <button
                type="button"
                onClick={() => setBilling(false)}
                className="mt-2 text-sm text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                <span>
                  <i className="las la-pen"></i> Edit
                </span>
              </button>
            )}
          </h3>

          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <FormItem label="First name" error={errors.first_name}>
              <Input
                placeholder="John"
                type="text"
                className="mt-1"
                {...register("first_name", {
                  required: "First name is required",
                })}
                disabled={billing}
              />
            </FormItem>
            <FormItem label="Last name" error={errors.last_name}>
              <Input
                placeholder="Doe"
                type="text"
                className="mt-1"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                disabled={billing}
              />
            </FormItem>
            <FormItem label="Email" error={errors.email}>
              <Input
                type="email"
                placeholder="john@example.com"
                className="mt-1"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                disabled={billing}
              />
            </FormItem>
            <FormItem label="Phone number" error={errors.phone}>
              <PhoneInput
                name="phone"
                register={register}
                required
                disabled={billing}
              />
            </FormItem>
            {!billing && (
              <div>
                <ButtonPrimary type="submit">Continue to payment</ButtonPrimary>
              </div>
            )}
          </form>
        </div>
      </div>
      {billing && (
        <div className="w-full mt-10 flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
          <h3 className="text-2xl font-semibold">Payment Details</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
          <div className="mt-6">{children}</div>
        </div>
      )}
    </>
  );
};

export default CheckoutContent;
