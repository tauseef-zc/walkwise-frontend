"use client";
import Guide from "@/assets/icons/Guide";
import Traveler from "@/assets/icons/Traveler";
import FormItem from "@/components/onboarding/FormItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  setData,
  setStep,
} from "@/services/redux/reducers/slices/OnboardingSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const cardStyle =
  "flex flex-col items-center gap-3 p-6 hover:cursor-pointer";

const OnBoarding = () => {
  const { step, data } = useAppSelector((state) => state.onboarding);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleRole = useCallback(
    (roleName: string) => {
      dispatch(setData({ role: roleName }));
    },
    [dispatch]
  );

  const handleNext = useCallback(() => {
    dispatch(setStep(step + 1));
  }, [dispatch, step]);

  useEffect(() => {
    if (step !== 1) {
      push("/onboarding/" + data.role);
    }
  }, [step, push, data.role]);

  return (
    <div className="space-y-11">
      <div className="listingSection__wrap ">
        <h2 className="text-2xl font-semibold text-center">
          Please choose your role
        </h2>
        {/* FORM */}
        <div className="space-y-8 py-8">
          {/* ITEM */}
          <FormItem>
            <div className="flex items-center justify-evenly">
              <div
                onClick={() => handleRole("traveler")}
                className={
                  cardStyle +
                  (data.role === "traveler"
                    ? "cursor-pointer border border-blue-700 rounded-lg shadow-lg text-blue-700 transition-all"
                    : "")
                }
              >
                <Traveler
                  width={100}
                  height={100}
                  className={
                    data.role === "traveler"
                      ? "fill-blue-700"
                      : "dark:fill-white hover:animate-pulse"
                  }
                />
                <p className="text-regular">Traveler</p>
              </div>
              <div
                onClick={() => handleRole("guide")}
                className={
                  cardStyle +
                  (data.role === "guide"
                    ? "cursor-pointer border border-blue-700 rounded-lg shadow-lg text-blue-700 transition-all"
                    : "")
                }
              >
                <Guide
                  width={100}
                  height={100}
                  className={
                    data.role === "guide"
                      ? "fill-blue-700"
                      : "dark:fill-white hover:animate-pulse"
                  }
                />
                <p className="text-regular">Guide</p>
              </div>
            </div>
          </FormItem>
        </div>
      </div>
      <div className="flex justify-end space-x-5">
        <ButtonPrimary
          onClick={() => handleNext()}
          disabled={data.role === ""}
          className={`cursor-pointer ${
            data.role === "" ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Continue
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default OnBoarding;
