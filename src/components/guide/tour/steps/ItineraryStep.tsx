import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";

import React from "react";
import { useForm } from "react-hook-form";
import SingleDayCard from "./partials/SingleDayCard";
import { IFormInput } from "../TourCreateForm";

interface ItineraryFormInput extends IFormInput {
  tour_days?: {
    title: string;
    itinerary: string;
    meal_plan: string;
    accommodation: string;
  }[];
}

const ItineraryStep = ({
  tourData,
  onSubmitAction,
  onBackAction,
}: {
  tourData: ItineraryFormInput;
  onSubmitAction: (data: ItineraryFormInput) => void;
  onBackAction: (step: number) => void;
}) => {
  const idCount = tourData.tour_days?.length ?? 0;
  const ids: number[] = idCount > 0 ? Array.from(Array(idCount).keys()) : [0];  
  const [cardIds, setCardIds] = React.useState<number[]>(ids);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ItineraryFormInput>({
    defaultValues: tourData ?? {},
  });

  const onCardRemoved = (cardId: number) => {
    let updatedIds = cardIds.filter((value) => value !== cardId);
    setCardIds(updatedIds);
  };

  const onCardAdded = () => {
    let lastId: number = cardIds.slice(-1)[0];
    setCardIds([...cardIds, lastId + 1]);
  };

  const handleNext = (dataItems: ItineraryFormInput) => {
    onSubmitAction(dataItems);
  };

  console.log({tourData, cardIds});

  return (
    <>
      <form action="POST" onSubmit={handleSubmit(handleNext)}>
        <div className="w-full p-10 border-dashed border-2 border-neutral-200 dark:border-neutral-700">
          {cardIds.map((cardId, index) => (
            <SingleDayCard
              key={cardId}
              cardIndex={index}
              cardId={cardId}
              removeAction={onCardRemoved}
              register={register}
              errors={errors}
            />
          ))}
          <div className="flex justify-between">
            <ButtonSecondary type="button" onClick={() => onCardAdded()}>
              Add Another Day
            </ButtonSecondary>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <ButtonSecondary type="button" onClick={() => onBackAction(1)}>
            Back
          </ButtonSecondary>
          <ButtonPrimary>Continue</ButtonPrimary>
        </div>
      </form>
    </>
  );
};

export default ItineraryStep;
