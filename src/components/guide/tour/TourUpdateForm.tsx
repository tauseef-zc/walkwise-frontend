"use client";
import { useState } from "react";
import TourSteps, { iTourStep } from "./TourSteps";
import StepInformation from "./steps/InformationStep";
import ItineraryStep from "./steps/ItineraryStep";
import CompletionStep from "./steps/CompletionStep";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useGuide } from "@/services/app/GuideService";
import { Tour, TourImages } from "@/data/tours";
import { IFormInput } from "./TourCreateForm";
import moment from "moment";
import { useRouter } from "next/navigation";

const tourStepsItems: iTourStep[] = [
  { step: 1, name: "Tour Information", description: "Add Tour Details" },
  { step: 2, name: "Tour Itinerary", description: "Single day overview" },
  { step: 3, name: "Completion", description: "Availability and images" },
];

interface ValidationError {
  errors: Array<any>;
  message: string;
}

export interface ITourUpdateInput extends IFormInput {

}

const getInitialData = (tour: Tour): ITourUpdateInput => {
  const tour_dates: { from: Date | null; to: Date | null }[] = [];

  if (tour.tour_availability && tour.tour_availability.length > 0) {
    tour.tour_availability.forEach((item: any, index) => {
      tour_dates.push({
        from: moment(item.from).toDate(),
        to: moment(item.to).toDate(),
      });
    });
  }

  return {
    title: tour.title,
    overview: tour.overview,
    location: tour.location,
    start_point: tour.start_location,
    end_point: tour.end_location,
    tour_category_id: tour.category.id,
    price: Number(tour.price),
    max_packs: tour.max_packs,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
    conditions: tour.conditions,
    tour_days: tour.tour_days,
    tour_dates: tour_dates,
    tour_images: [],
    existing_images: tour.images
  };
};

const TourUpdateForm = ({ tour }: { tour: Tour }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationError>({} as ValidationError);
  const [data, setData] = useState<ITourUpdateInput>({
    ...getInitialData(tour),
  } as ITourUpdateInput);
  const { updateTour } = useGuide();
  const { push } = useRouter();

  const prepareFormItems = (updatedData: ITourUpdateInput) => {
    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      if (["start_point", "end_point", "location"].includes(key)) {
        formData.append(key, JSON.stringify(value));
      } else if (key === "tour_images" && value) {
        value.forEach((image: File) =>
          formData.append("tour_images[]", image, image.name)
        );
      } else if (key === "existing_images" && value) {
        value.forEach((data: any) =>
          formData.append("existing_images[]", JSON.stringify(data))
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

  const handleNext = (dataItems: ITourUpdateInput) => {
    setData((state) => ({ ...state, ...dataItems }));
    window.scrollTo(0, 0);
    setStep(step + 1);
  };

  const handleBack = (step: number) => {
    setStep(step);
  };

  const handleSubmit = (dataItems: ITourUpdateInput) => {
    const updatedData: ITourUpdateInput = { ...data, ...dataItems };

    setStep(step + 1);
    setData(updatedData);
    setLoading(true);

    const formData = prepareFormItems(updatedData);

    updateTour(tour.id, formData)
      .then((data) => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          push('/dashboard/tours');
        }, 3000);
      })
      .catch((err) => {
        setStep(3);
        setLoading(false);
        setErrors(err.response.data);
      });
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
          tourData={data}
          onSubmitAction={(data) => handleSubmit(data)}
          onBackAction={handleBack}
          loading={loading}
          serverErrors={errors}
        />
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center m-16">
          <ArrowPathIcon className="w-24 h-24 spin-slow" />
          <h2 className="text-2xl">Your tour is updating now</h2>
          <p className="text-sm">Please wait few minutes</p>
        </div>
      )}

      {success && (
        <div className="flex flex-col items-center justify-center m-16">
          <CheckCircleIcon className="w-24 h-24 text-green-500" />
          <h2 className="text-2xl">Success</h2>
          <p className="text-sm">
            Your tour has been updated, It will be reflect on tour soon
          </p>
        </div>
      )}
    </div>
  );
};

export default TourUpdateForm;
