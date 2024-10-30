import React from "react";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import DateRangeCard from "./partials/DateRangeCard";
import ImageUploader from "./partials/ImageUploader";
import Input from "@/components/shared/Input";
import { useForm } from "react-hook-form";
import { IFormInput } from "../TourCreateForm";

interface IFinalFormInput extends IFormInput {
  tour_dates?: {
    from: Date | null;
    to: Date | null;
  }[];
  tour_images?: File[];
}
const CompletionStep = ({
  tourData,
  onSubmitAction,
  onBackAction,
  loading = false,
  serverErrors,
}: {
  tourData: IFinalFormInput;
  onSubmitAction: (data: IFinalFormInput) => void;
  onBackAction: (step: number) => void;
  loading?: boolean;
  serverErrors?: {
    errors: Array<any>;
    message: string;
  };
}) => {
  const idCount = tourData.tour_dates?.length ?? 0;
  const ids: number[] = idCount > 0 ? Array.from(Array(idCount).keys()) : [0];  
  const [cardIds, setCardIds] = React.useState<number[]>(ids);
  const [openDate, setOpenDate] = React.useState<number>(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFinalFormInput>();

  const onCardRemoved = (cardId: number) => {
    let updatedIds = cardIds.filter((value) => value !== cardId);
    setCardIds(updatedIds);
  };

  const onCardAdded = () => {
    let updatedId: number = cardIds.slice(-1)[0] + 1;
    setCardIds([...cardIds, updatedId]);
    setOpenDate(updatedId);
  };

  return (
    <form action="POST" onSubmit={handleSubmit(onSubmitAction)}>
      <div className="mb-10">
        <h5 className="mb-5">Tour Availability</h5>
        {cardIds.map((cardId, index) => (
          <DateRangeCard
            key={index}
            cardIndex={index}
            cardId={cardId}
            onCardRemoved={onCardRemoved}
            collapsed={openDate == cardId}
            register={register}
            setValue={setValue}
            errors={errors}
            dates={tourData?.tour_dates?.find((date, id) => id == cardId)}
          />
        ))}
        <ButtonSecondary type="button" onClick={() => onCardAdded()}>
          Add More Dates
        </ButtonSecondary>
      </div>
      <div>
        <h5 className="mb-0">Tour Images</h5>
        <p className="text-sm text-gray-400 mb-5">
          You can upload up to 10 images
        </p>
        {errors.tour_dates && (
          <p className="text-sm text-red-500 mb-5">Please upload tour images</p>
        )}
        <ImageUploader onUpload={(files) => setValue("tour_images", files)} />
        <Input type="hidden" {...register("tour_images", { required: true })} />
      </div>

      {serverErrors && (
        <p className="text-sm text-red-500 mb-5">{serverErrors.message}</p>
      )}

      {!loading && (
        <div className="flex justify-between">
          <ButtonSecondary type="button" onClick={() => onBackAction(2)}>
            Back
          </ButtonSecondary>

          <ButtonPrimary loading={loading}>Complete</ButtonPrimary>
        </div>
      )}
    </form>
  );
};

export default CompletionStep;
