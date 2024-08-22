import FormItem from "@/components/onboarding/FormItem";
import ButtonThird from "@/components/shared/ButtonThird";
import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/Textarea";
import React from "react";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";

interface ItineraryFormInput {
  tour_days?: {
    title: string;
    itinerary: string;
    meal_plan: string;
    accommodation: string;
  }[];
}
const SingleDayCard = ({
  cardIndex,
  cardId,
  removeAction,
  register,
  errors,
}: {
  cardId: number;
  cardIndex: number;
  removeAction: (id: number) => void;
  register: UseFormRegister<ItineraryFormInput>;
  errors: FieldErrors<ItineraryFormInput>;
}) => {
  return (
    <div className="p-10 shadow bg-white dark:bg-neutral-800 mb-5">
      <h5 className="mb-5 ">Day #{cardIndex + 1}</h5>
      <FormItem
        label="Title"
        className="mb-5"
        error={errors.tour_days?.[cardId]?.title as FieldError}
      >
        <Input
          placeholder="ex: Day 1 - Colombo"
          {...register(`tour_days.${cardId}.title`, {
            required: "Title is required",
          })}
        />
      </FormItem>
      <FormItem
        label="Day Itinerary"
        className="mb-5"
        error={errors.tour_days?.[cardId]?.itinerary as FieldError}
      >
        <Textarea
          {...register(`tour_days.${cardId}.itinerary`, {
            required: "Itinerary is required",
          })}
        />
      </FormItem>
      <FormItem
        label="Meal Plan"
        className="mb-5"
        error={errors.tour_days?.[cardId]?.meal_plan as FieldError}
      >
        <Input
          placeholder="ex: Breakfast, Lunch"
          {...register(`tour_days.${cardId}.meal_plan`, {
            required: "Meal plan is required",
          })}
        />
      </FormItem>
      <FormItem
        label="Accommodation"
        className="mb-5"
        error={errors.tour_days?.[cardId]?.accommodation as FieldError}
      >
        <Input
          placeholder="ex: At Resort"
          {...register(`tour_days.${cardId}.accommodation`, {
            required: "Accommodation is required",
          })}
        />
      </FormItem>
      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex justify-start mt-5">
        {cardId !== 0 && (
          <ButtonThird
            className="bg-red-500 text-white hover:bg-red-600 sm:py-2"
            onClick={() => removeAction(cardId)}
          >
            {" "}
            Remove{" "}
          </ButtonThird>
        )}
      </div>
    </div>
  );
};

export default SingleDayCard;
