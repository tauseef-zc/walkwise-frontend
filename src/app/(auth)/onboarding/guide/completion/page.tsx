"use client";
import FormItem from "@/components/onboarding/FormItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Checkbox from "@/components/shared/Checkbox";
import Input from "@/components/shared/Input";
import TagsDropdown from "@/components/shared/Searchable/TagsDropdown";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { setStep } from "@/services/redux/reducers/slices/OnboardingSlice";
import { File } from "buffer";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";

interface IFormInput {
  phone: string;
  avatar: File;
  has_vehicle: boolean;
}

function Completion() {
  const { step, data } = useAppSelector((state) => state.onboarding);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleNext = (dataItems: IFormInput) => {
    push("/dashboard" );
  };

  useEffect(() => {
    if (step === 2) {
      push("/onboarding/"+ data.role );
    }
  }, [data.role, push, step]);

//   if (data.role !== "guide" || step < 3) {
//         redirect("/onboarding");
//   }

  return (
    <form
      className="space-y-11"
      method="POST"
      onSubmit={handleSubmit(handleNext)}
    >
      <div className="listingSection__wrap ">
        <h2 className="text-2xl font-semibold">Complete your profile</h2>
        <div className="space-y-8 py-8">
          <FormItem label="Display Image" error={errors.phone as FieldError}>
            <Input
              type="file"
              {...register("avatar", { required: "Display Image is required" })}
            />
          </FormItem>
          <FormItem label="Phone number" error={errors.phone as FieldError}>
            <Input
              type="text"
              {...register("phone", { required: "Phone number is required" })}
            />
          </FormItem>
          <FormItem
            label="Do you have a Vehicle?"
            error={errors.has_vehicle as FieldError}
          >
            <div className="flex justify-start gap-5">
              <label className="item">
                <input type="radio" {...register("has_vehicle")} value="true" />{" "}
                Yes
              </label>
              <label className="item">
                <input
                  type="radio"
                  {...register("has_vehicle")}
                  value="false"
                />{" "}
                No
              </label>
            </div>
          </FormItem>
          <FormItem label="What language do you speak">
            <TagsDropdown
              options={["English", "Sinhala", "Tamil"]}
              placeHolder="Choose your language"
            />
          </FormItem>
        </div>
      </div>
      <div className="flex justify-end space-x-5">
        <ButtonSecondary type="button" onClick={() => {
            dispatch(setStep(step - 1));
        }}>
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
