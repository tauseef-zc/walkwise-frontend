import FormItem from "@/components/onboarding/FormItem";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Textarea from "@/components/shared/Textarea";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { FieldError, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { useEffect, useState } from "react";
import {
  ICategory,
  getTourCategory,
} from "@/services/redux/reducers/slices/TourCategorySlice";
import { useApi } from "@/hooks/useApi";
import { IFormInput } from "../TourCreateForm";
import { AxiosResponse } from "axios";
import LocationInput, { PlaceResult } from "@/components/inputs/LocationInput";
import useTourCategory from "@/services/redux/actions/useTourCategory";

interface IInformationFormInput extends IFormInput {
  title?: string;
  location?: PlaceResult;
  overview?: string;
  tour_category_id?: number;
  price?: number;
  start_point?: PlaceResult;
  end_point?: PlaceResult;
  max_packs?: number;
  inclusions?: string;
  exclusions?: string;
  conditions?: string;
}

const StepInformation = ({
  tourData,
  onSubmitAction,
}: {
  tourData: IInformationFormInput;
  onSubmitAction: (data: IInformationFormInput) => void;
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IInformationFormInput>({
    defaultValues: tourData,
  });
  const onSubmit = (formData: IInformationFormInput) => {
    console.log(formData);
    onSubmitAction(formData);
  };
  const { categories } = useTourCategory();

  return (
    <>
      <form action="POST" onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          label="Tour Name"
          className="mb-5"
          error={errors.title as FieldError}
        >
          <Input
            placeholder="Ex: Colombo Tour 3 days / 2 nights"
            {...register("title", { required: "Title is required" })}
          />
        </FormItem>
        <FormItem
          label="Primary Tour Location"
          className="mb-5"
          error={errors.location as FieldError}
        >
          <LocationInput
            placeholder="Tour based on location. Ex: Galle"
            defaultLocation={tourData.location}
            onPlaceSelected={function (location: PlaceResult): void {
              setValue("location", location);
            }}
            {...register("location", {
              required: "Primary location is required",
            })}
          />
        </FormItem>
        <FormItem
          label="Overview"
          className="mb-5"
          error={errors.overview as FieldError}
        >
          <Textarea
            {...register("overview", { required: "Overview is required" })}
          />
        </FormItem>
        <FormItem
          label="Tour Category"
          className="mb-5"
          error={errors.tour_category_id as FieldError}
        >
          <Select
            {...register("tour_category_id", {
              required: "Category is required",
            })}
          >
            <option value="">Select Category</option>
            {categories.length > 0 &&
              categories.map((category: ICategory) => (
                <option value={category.id} key={category.id}>
                  {category.category}
                </option>
              ))}
          </Select>
        </FormItem>
        <FormItem
          label="Price"
          className="mb-5"
          desc="The base currency is USD ($)"
          error={errors.price as FieldError}
        >
          <Input
            placeholder="Ex: 100"
            {...register("price", { required: "Price is required" })}
          />
        </FormItem>
        <FormItem
          label="Start Location"
          className="mb-5"
          error={errors.start_point as FieldError}
        >
          <LocationInput
            type="places"
            placeholder="Ex: Bandaranayake Airport"
            defaultLocation={tourData.location}
            onPlaceSelected={function (location: PlaceResult): void {
              setValue("start_point", location);
            }}
            {...register("start_point", {
              required: "Please enter a tour Starting Location",
            })}
          />
        </FormItem>
        <FormItem
          label="End Location"
          className="mb-5"
          error={errors.end_point as FieldError}
        >
          <LocationInput
            type="places"
            placeholder="Ex: Colombo, Sri Lanka"
            defaultLocation={tourData.location}
            onPlaceSelected={function (location: PlaceResult): void {
              setValue("end_point", location);
            }}
            {...register("end_point", {
              required: "Please enter a tour Ending Location",
            })}
          />
        </FormItem>
        <FormItem
          label="Maximum People"
          desc="The maximum capacity of the tour, Age below 5 will not calculate to this capacity"
          className="mb-5"
          error={errors.max_packs as FieldError}
        >
          <Input
            type="number"
            min={0}
            {...register("max_packs", {
              required: "Maximum People is required",
            })}
          />
        </FormItem>
        <FormItem label="Inclusions" className="mb-5">
          <Textarea {...register("inclusions")} />
        </FormItem>
        <FormItem label="Exclusions" className="mb-5">
          <Textarea {...register("exclusions")} />
        </FormItem>
        <FormItem label="Conditions" className="mb-5">
          <Textarea {...register("conditions")} />
        </FormItem>
        <ButtonPrimary type="submit">Continue</ButtonPrimary>
      </form>
    </>
  );
};

export default StepInformation;
