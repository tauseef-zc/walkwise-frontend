import React, { memo, useEffect } from "react";
import DatesRangeInput from "./DatesRangeInput";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Input from "@/components/shared/Input";
import ButtonThird from "@/components/shared/ButtonThird";

interface ITourDate {
  from: Date | null;
  to: Date | null;
}

interface DateFormat {
  tour_dates?: ITourDate[];
}
const DateRangeCard = ({
  dates,
  cardId,
  cardIndex,
  onCardRemoved,
  collapsed = false,
  register,
  setValue,
  errors,
}: {
  dates?: ITourDate;
  cardId: number;
  cardIndex: number;
  onCardRemoved: (id: number) => void;
  collapsed?: boolean;
  register: UseFormRegister<DateFormat>;
  setValue: UseFormSetValue<DateFormat>;
  errors: FieldErrors<DateFormat>;
}) => {
  const [open, setOpen] = React.useState(collapsed);

  useEffect(() => {
    setOpen(collapsed);
  }, [collapsed]);

  return (
    <div className="mb-5 shadow bg-white dark:bg-neutral-800 p-10 relative">
      <div className="pb-2">
        {open ? (
          <ChevronDownIcon
            className="w-5 h-5 text-neutral-500 absolute right-10 top-10"
            onClick={() => setOpen(false)}
          />
        ) : (
          <ChevronUpIcon
            className="w-5 h-5 text-neutral-500 absolute right-10 top-10 "
            onClick={() => setOpen(true)}
          />
        )}

        <h5
          className="font-semibold text-sm sm:text-lg"
          onClick={() => setOpen(!open)}
        >
          Season #{cardIndex + 1}
        </h5>
        {errors.tour_dates?.[cardId] && (
          <p className="text-sm text-red-500 mb-5">
            {errors.tour_dates?.[cardId]?.message}
          </p>
        )}
      </div>
      <div className={`${open ? "block" : "hidden"}`}>
        <DatesRangeInput
          defaultValue={dates}
          onChangeAction={(data) => {
            setValue(`tour_dates.${cardId}`, data);
          }}
        />
        <input
          type="hidden"
          {...register(`tour_dates.${cardId}`, {
            required: "Please select a tour availability date range.",
          })}
        />
        {cardIndex !== 0 && (
          <ButtonThird
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => onCardRemoved(cardId)}
          >
            Remove
          </ButtonThird>
        )}
      </div>
    </div>
  );
};

export default memo(DateRangeCard);
