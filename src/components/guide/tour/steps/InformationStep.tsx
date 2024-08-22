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

interface IInformationFormInput extends IFormInput{
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
}

const StepInformation = ({
  tourData,
  onSubmitAction,
}: {
  tourData: IInformationFormInput;
  onSubmitAction: (data: IInformationFormInput) => void;
}) => {
  const dispatch = useAppDispatch();
  const { get } = useApi();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IInformationFormInput>({
    defaultValues: tourData,
  });
  const onSubmit = (formData: IInformationFormInput) => {
    onSubmitAction(formData);
  };
  const { data: categories } = useAppSelector(
    (state) => state.site_data.categories
  );

  const getCategories = () => {
    return getTourCategory(get<AxiosResponse>("/tour-categories"));
  }
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, []);

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
          <Input
            placeholder="Ex: Airport"
            {...register("start_point", {
              required: "Start Location is required",
            })}
          />
        </FormItem>
        <FormItem
          label="End Location"
          className="mb-5"
          error={errors.end_point as FieldError}
        >
          <Input
            placeholder="Ex: Customer Hotel / Airport"
            {...register("end_point", {
              required: "End Location is required",
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
