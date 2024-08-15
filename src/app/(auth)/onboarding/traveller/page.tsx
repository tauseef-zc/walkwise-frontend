"use client";
import FormItem from "@/components/onboarding/FormItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Input from "@/components/shared/Input";
import TagsDropdown from "@/components/shared/Searchable/TagsDropdown";
import Textarea from "@/components/shared/Textarea";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { setStep } from "@/services/redux/reducers/slices/OnboardingSlice";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";

interface IFormInput {
  interests: string[];
  dietary_restrictions: string;
}

const tags = [
  "Photography",
  "Sports",
  "Gaming",
  "Traveling",
  "Camping",
  "Cycling",
  "Painting",
  "Site Surfing",
];

const TravellerOnBoarding = () => {
  const { step, data } = useAppSelector((state) => state.onboarding);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();
  const { push } = useRouter();

  const handleNext = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    if (step < 2) {
      push("/onboarding");
    }
    if (step > 2) {
      push("/onboarding/" + data.role + "/completion");
    }
  }, [step, push, data.role]);

  if (data.role !== "traveller") {
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
          <FormItem label="Interests" error={errors.interests as FieldError}>
            <TagsDropdown
              placeHolder="Choose your interests"
              options={tags}
              selectedItems={[]}
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
            label="Dietary restrictions"
            error={errors.dietary_restrictions as FieldError}
          >
            <Textarea
              {...register("dietary_restrictions", {
                required: "The dietary restrictions field is required",
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
        <ButtonPrimary
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Continue
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default TravellerOnBoarding;
