"use client";
import { useState } from "react";
import TourSteps, { iTourStep } from "./TourSteps";
import StepInformation from "./steps/InformationStep";
import ItineraryStep from "./steps/ItineraryStep";
import CompletionStep from "./steps/CompletionStep";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useGuide } from "@/services/app/GuideService";

const tourStepsItems: iTourStep[] = [
  { step: 1, name: "Tour Information", description: "Add Tour Details" },
  { step: 2, name: "Tour Itinerary", description: "Single day overview" },
  { step: 3, name: "Completion", description: "Availability and images" },
];

export interface IFormInput {
  title?: string;
  overview?: string;
  tour_category_id?: number;
  price?: number;
  start_point?: string;
  end_point?: string;
  max_packs?: number;
  inclusions?: string;
  exclusions?: string;
  conditions?: string;
  tour_days?: {
    title: string;
    itinerary: string;
    meal_plan: string;
    accommodation: string;
  }[];
  tour_dates?: {
    from: Date | null;
    to: Date | null;
  }[];
  tour_images?: File[];
}

const TourCreateForm = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<IFormInput>({} as IFormInput);
  const { createTour } = useGuide();

  const prepareFormItems = (updatedData: IFormInput) => {
    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      if (key === "tour_images" && value) {
        value.forEach((image: File) =>
          formData.append("tour_images[]", image, image.name)
        );
      } else if (key === "tour_dates" && value) {
        value.forEach((date: any) =>
          formData.append("tour_dates[]", JSON.stringify(date))
        );
      } else if (key === "tour_days" && value) {
        value.forEach((day: any) =>
          formData.append("tour_days[]", JSON.stringify(day))
        );
      } else {
        formData.append(key, String(value));
      }
    });
    return formData;
  };

  const handleNext = (dataItems: IFormInput) => {
    setData((state) => ({ ...state, ...dataItems }));
    setStep(step + 1);
  };

  const handleBack = (step: number) => {
    setStep(step);
  };

  const handleSubmit = (dataItems: IFormInput) => {
    const updatedData: IFormInput = { ...data, ...dataItems };

    setStep(step + 1);
    setData(updatedData);
    setLoading(true);

    const formData = prepareFormItems(updatedData);

    createTour(formData)
      .then((data) => {
        setLoading(false);
        console.log(data);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setStep(1);
            setData({} as IFormInput);
        }, 10000);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      {/* Steps */}
      <TourSteps steps={tourStepsItems} currentStep={step} />
      {step === 1 && (
        <StepInformation
          tourData={data}
          onSubmitAction={(data) => handleNext(data)}
        />
      )}
      {step === 2 && (
        <ItineraryStep
          tourData={data}
          onSubmitAction={(data) => handleNext(data)}
          onBackAction={handleBack}
        />
      )}
      {step === 3 && (
        <CompletionStep
          onSubmitAction={(data) => handleSubmit(data)}
          onBackAction={handleBack}
          loading={loading}
        />
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center m-16">
          <ArrowPathIcon className="w-24 h-24 spin-slow" />
          <h2 className="text-2xl">Your tour is creating now</h2>
          <p className="text-sm">Please wait few minutes</p>
        </div>
      )}

      {success && (
        <div className="flex flex-col items-center justify-center m-16">
          <CheckCircleIcon className="w-24 h-24 text-green-500" />
          <h2 className="text-2xl">Success</h2>
          <p className="text-sm">Your tour has been created, It will be published soon</p>
        </div>
      )}
    </div>
  );
};

export default TourCreateForm;
