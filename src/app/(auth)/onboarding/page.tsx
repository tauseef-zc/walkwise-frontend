"use client";
import Guide from "@/assets/icons/Guide";
import Traveller from "@/assets/icons/Traveller";
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
  "flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 hover:cursor-pointer";

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
                onClick={() => handleRole("traveller")}
                className={
                  cardStyle +
                  (data.role === "traveller"
                    ? "border border-gray-200 dark:border-gray-700 rounded-lg shadow"
                    : "")
                }
              >
                <Traveller
                  width={100}
                  height={100}
                  className="dark:fill-white"
                />
                <p className="text-regular dark:text-white">Traveller</p>
              </div>
              <div
                onClick={() => handleRole("guide")}
                className={
                  cardStyle +
                  (data.role === "guide"
                    ? "border border-gray-200 dark:border-gray-700 rounded-lg shadow"
                    : "")
                }
              >
                <Guide width={100} height={100} />
                <p className="text-regular dark:text-white">Guide</p>
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
