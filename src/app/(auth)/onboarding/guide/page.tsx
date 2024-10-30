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
import { File } from "buffer";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import tags from "@/data/jsons/__abilities.json";
import { useGuide } from "@/services/app/GuideService";
import UploadInput from "@/components/shared/UploadInput";

interface IFormInput {
  expertise?: Array<string>;
  bio?: string;
  experience?: number | null;
  tourism_license?: FileList | null;
  registration_certificate?: FileList | null;
}

const GuideOnBoarding = () => {
  const { step, data } = useAppSelector((state) => state.onboarding);
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { createGuide } = useGuide();
  const {
    expertise,
    bio,
    experience,
    tourism_license,
    registration_certificate,
  } = data;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      expertise,
      bio,
      experience,
      tourism_license,
      registration_certificate,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = (dataItems: IFormInput) => {
      setLoading(true);
      dispatch(setData({ ...data, ...dataItems }));
      createGuide(dataItems).then((res) => {
        setLoading(false);
        dispatch(setStep(step + 1));
      }).catch((err) => {
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

  if (data.role !== "guide") {
    redirect("/onboarding");
  }

  return (
    <>
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
            <FormItem label="About" error={errors.bio as FieldError}>
              <Textarea
                {...register("bio", {
                  required: "The about field is required",
                })}
                placeholder="Tell us about yourself"
              />
            </FormItem>

            <FormItem label="Abilities" error={errors.expertise as FieldError}>
              <TagsDropdown
                placeHolder="Choose your abilities"
                options={tags}
                selectedItems={expertise}
                onItemSelect={(items) => {
                  setValue("expertise", items);
                }}
              />
              <Input
                type="hidden"
                {...register("expertise", {
                  required: "The ability field is required",
                })}
              />
            </FormItem>

            <FormItem
              label="Years of experience"
              error={errors.experience as FieldError}
            >
              <Input
                type="number"
                {...register("experience", {
                  required: "The experience field is required",
                  min: {
                    value: 0,
                    message: "The experience field is required",
                  },
                })}
              />
            </FormItem>

            <FormItem
              label="Attach tourism license"
              error={errors.tourism_license as FieldError}
            >
              <UploadInput
                accept="image/*, application/pdf"
                {...register("tourism_license", {
                  required: "The tourism license field is required",
                })}
              />
            </FormItem>

            <FormItem
              label="Attach tourism registration certificate"
              error={errors.registration_certificate as FieldError}
            >
              <UploadInput
                accept="image/*, application/pdf"
                {...register("registration_certificate", {
                  required: "The registration certificate field is required",
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
            className={`cursor-pointer`}
            loading={loading}
            disabled={loading}
          >
            Continue
          </ButtonPrimary>
        </div>
      </form>
    </>
  );
};

export default GuideOnBoarding;
