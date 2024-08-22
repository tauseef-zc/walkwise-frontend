"use client";
import FormItem from "@/components/onboarding/FormItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Input from "@/components/shared/Input";
import TagsDropdown from "@/components/shared/Searchable/TagsDropdown";
import Textarea from "@/components/shared/Textarea";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  setData,
  setStep,
} from "@/services/redux/reducers/slices/OnboardingSlice";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import abilities from "@/data/jsons/__traveler_abilities.json";
import interestsTags from "@/data/jsons/__traveler_interests.json";
import UploadInput from "@/components/shared/UploadInput";
import { useTraveler } from "@/services/app/TravelerService";

interface IFormInput {
  accessibility: string[];
  interests: string[];
  dietary_restrictions: string;
  gender: number | null;
  nationality: string;
  passport_image: FileList | null;
}

const TravelerOnBoarding = () => {
  const { step, data } = useAppSelector((state) => state.onboarding);
  const [loading, setLoading] = useState<boolean>(false);
  const { createTraveler } = useTraveler();
  const dispatch = useAppDispatch();
  const {
    accessibility,
    interests,
    dietary_restrictions,
    gender,
    nationality,
    passport_image,
  } = data;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      accessibility,
      interests,
      dietary_restrictions,
      gender,
      nationality,
      passport_image,
    },
  });
  const { push } = useRouter();

  const handleNext = (dataItems: IFormInput) => {
    setLoading(true);
    dispatch(setData({ ...data, ...dataItems }));
    createTraveler(dataItems)
      .then((res) => {
        setLoading(false);
        dispatch(setStep(step + 1));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (step < 2) {
      push("/onboarding");
    }
    if (step > 2) {
      push("/onboarding/" + data.role + "/completion");
    }
  }, [step, push, data.role]);

  if (data.role !== "traveler") {
    redirect("/onboarding");
  }

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
            label="Let us know about your abilities"
            error={errors.accessibility as FieldError}
          >
            <TagsDropdown
              placeHolder="Choose Abilities"
              options={abilities}
              selectedItems={accessibility}
              onItemSelect={(items) => {
                setValue("accessibility", items);
              }}
            />
            <Input
              type="hidden"
              {...register("accessibility", {
                required: "The accessibility field is required",
              })}
            />
          </FormItem>
          <FormItem
            label="What are your interests"
            error={errors.interests as FieldError}
          >
            <TagsDropdown
              placeHolder="Choose your interests"
              options={interestsTags}
              selectedItems={interests}
              onItemSelect={(items) => {
                setValue("interests", items);
              }}
            />
            <Input
              type="hidden"
              {...register("interests", {
                required: "The interests field is required",
              })}
            />
          </FormItem>
          <FormItem
            label="Do you have any dietary restrictions"
            error={errors.dietary_restrictions as FieldError}
          >
            <Textarea
              {...register("dietary_restrictions", {
                required: "The dietary restrictions field is required",
              })}
            />
          </FormItem>

          <FormItem label="What is your gender?">
            <div className="flex justify-start gap-5">
              <label className="item">
                <input type="radio" {...register("gender")} value="1" /> Male
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
            label="What is your Nationality?"
            error={errors.nationality as FieldError}
          >
            <Input
              type="text"
              {...register("nationality", {
                required: "The nationality field is required",
              })}
            />
          </FormItem>

          <FormItem
            label="Passport Image"
            desc="Please upload your passport front page image"
            error={errors.passport_image as FieldError}
          >
            <UploadInput
              accept="image/*, application/pdf"
              {...register("passport_image", {
                required: "The passport image field is required",
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
          Continue
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default TravelerOnBoarding;
