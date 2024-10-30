"use client";
import PhoneInput from "@/components/inputs/PhoneInput";
import FormItem from "@/components/onboarding/FormItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Checkbox from "@/components/shared/Checkbox";
import Input from "@/components/shared/Input";
import TagsDropdown from "@/components/shared/Searchable/TagsDropdown";
import UploadInput from "@/components/shared/UploadInput";
import { useAuth } from "@/services/app/AuthService";
import { useGuide } from "@/services/app/GuideService";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { setStep } from "@/services/redux/reducers/slices/OnboardingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";

interface IFormInput {
  phone: string;
  avatar: FileList;
  has_vehicle: boolean;
  gender?: number | null;
  primary_lang: string;
  other_lang: string[];
}

function Completion() {
  const { step, data } = useAppSelector((state) => state.onboarding);
  const { user } = useAppSelector((state) => state.auth);
  const { createGuide } = useGuide();
  const { checkAuth } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      has_vehicle: false,
      gender: 1,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleNext = async (dataItems: IFormInput) => {
    setLoading(true);
    await createGuide(dataItems)
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

  useEffect(() => {
    if (!user?.onboarding) {
      setLoading(false);
      push("/dashboard");
    }
  }, [push, user]);

  return (
    <form
      className="space-y-11"
      method="POST"
      onSubmit={handleSubmit(handleNext)}
    >
      <div className="listingSection__wrap ">
        <h2 className="text-2xl font-semibold">Complete your profile</h2>
        <div className="space-y-8 py-8">
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
            <PhoneInput name="phone" register={register} required={true} />
          </FormItem>
          <FormItem label="What is your gender?">
            <div className="flex justify-start gap-5">
              <label className="item">
                <input
                  type="radio"
                  {...register("gender")}
                  value="1"
                  defaultChecked={true}
                />{" "}
                Male
              </label>
              <label className="item">
                <input type="radio" {...register("gender")} value="2" /> Female
              </label>
              <label className="item">
                <input type="radio" {...register("gender")} value="3" /> Other
              </label>
            </div>
          </FormItem>
          <FormItem
            label="Do you have a Vehicle?"
            error={errors.has_vehicle as FieldError}
          >
            <div className="flex justify-start gap-5">
              <label className="item">
                <input
                  type="radio"
                  {...register("has_vehicle")}
                  value="1"
                  defaultChecked={true}
                />{" "}
                Yes
              </label>
              <label className="item">
                <input type="radio" {...register("has_vehicle")} value="0" /> No
              </label>
            </div>
          </FormItem>
          <FormItem
            label="What is your primary language"
            error={errors.phone as FieldError}
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
        <ButtonPrimary
          type="submit"
          className={`cursor-pointer`}
          loading={loading}
          disabled={loading}
        >
          Complete
        </ButtonPrimary>
      </div>
    </form>
  );
}

export default Completion;
