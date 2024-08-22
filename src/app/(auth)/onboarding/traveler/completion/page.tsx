"use client";
import PhoneInput from "@/components/inputs/PhoneInput";
import FormItem from "@/components/onboarding/FormItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Input from "@/components/shared/Input";
import TagsDropdown from "@/components/shared/Searchable/TagsDropdown";
import UploadInput from "@/components/shared/UploadInput";
import { useAuth } from "@/services/app/AuthService";
import { useTraveler } from "@/services/app/TravelerService";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { setStep } from "@/services/redux/reducers/slices/OnboardingSlice";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";

interface IFormInput {
  avatar: FileList;
  phone: string;
  primary_lang: string;
  other_lang: string[];
  emergency_contact: {
    name: string;
    phone: string;
    email: string;
  };
}

const TravelerCompletion = () => {
  const { step, data } = useAppSelector((state) => state.onboarding);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);
  const { createTraveler } = useTraveler();
  const { checkAuth } = useAuth();
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { push } = useRouter();

  const handleNext = (dataItems: IFormInput) => {
    setLoading(true);
    createTraveler(dataItems)
      .then((res) => {
        checkAuth();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (step === 2) {
      push("/onboarding/" + data.role);
    }

    if (step <= 1) {
      push("/onboarding/");
    }
  }, [data.role, push, step]);

  if (data.role !== "traveler") {
    redirect("/onboarding");
  }

  useEffect(() => {
    if (!user?.onboarding) {
      setLoading(false);
      push("/my-account");
    }
  }, [push, user]);


  return (
    <form
      className="space-y-11"
      method="POST"
      onSubmit={handleSubmit(handleNext)}
    >
      <div className="listingSection__wrap ">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        {/* FORM */}
        <div className="space-y-8 py-8">
          {/* ITEM */}
          <FormItem
            label="Display Image"
            error={errors.avatar as FieldError}
            desc="Please upload a square image. The image should be at least 256x256."
          >
            <UploadInput
              {...register("avatar", { required: "Display Image is required" })}
              accept="image/*"
            />
          </FormItem>
          <FormItem label="Phone number" error={errors.phone as FieldError}>
            <PhoneInput name="phone" register={register} />
          </FormItem>
          <FormItem
            label="What is your primary language"
            error={errors.primary_lang as FieldError}
          >
            <Input
              type="text"
              {...register("primary_lang", {
                required: "Primary Language is required",
              })}
            />
          </FormItem>
          <FormItem label="Any other languages you can speak?">
            <TagsDropdown
              options={["English", "Sinhala", "Tamil"]}
              placeHolder="Choose your language"
              onItemSelect={(items) => {
                setValue("other_lang", items);
              }}
            />
            <Input type="hidden" {...register("other_lang")} />
          </FormItem>

          <h4>Emergency Contact</h4>

          <FormItem
            label="Contact Name"
            error={errors?.emergency_contact?.name as FieldError}
          >
            <Input
              type="text"
              {...register("emergency_contact.name", {
                required: "Contact Name is required",
              })}
            />
          </FormItem>
          <FormItem
            label="Contact Phone Number"
            error={errors?.emergency_contact?.phone as FieldError}
          >
            <PhoneInput name="emergency_contact.phone" register={register} required={true} />
          </FormItem>
          <FormItem
            label="Contact Email"
            error={errors?.emergency_contact?.email as FieldError}
          >
            <Input
              type="text"
              {...register("emergency_contact.email", {
                required: "Contact email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
          </FormItem>
        </div>
      </div>
      <div className="flex justify-end space-x-5">
        <ButtonSecondary
          type="button"
          onClick={() => {
            dispatch(setStep(step - 1));
          }}
        >
          Back
        </ButtonSecondary>
        <ButtonPrimary type="submit" loading={loading} disabled={loading}>
          Complete
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default TravelerCompletion;
