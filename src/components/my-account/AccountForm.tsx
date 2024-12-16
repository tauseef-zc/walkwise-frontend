/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { FC, useEffect, useState } from "react";
import Input from "../shared/Input";
import Select from "../shared/Select";
import Textarea from "../shared/Textarea";
import ButtonPrimary from "../shared/ButtonPrimary";
import FormItem from "../onboarding/FormItem";
import TagsDropdown from "../shared/Searchable/TagsDropdown";
import accessibilityList from "@/data/jsons/__traveler_abilities.json";
import interestList from "@/data/jsons/__traveler_interests.json";
import { useAppSelector } from "@/services/redux/hooks";
import { FieldError, useForm } from "react-hook-form";
import { useTraveler } from "@/services/app/TravelerService";
import { toast } from "react-toastify";
import PhoneInput from "../inputs/PhoneInput";

interface IFormInput {
  first_name: string;
  last_name: string;
  gender?: number;
  email: string;
  phone: string;
  primary_lang: string;
  other_lang: string[];
  dietary_restrictions: string;
  accessibility: string[];
  interests: string[];
  nationality: string;
  passport_image: FileList;
  emergency_contact: {
    name: string;
    phone: string;
    email: string;
  };
}

const AccountForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<boolean>(false);
  const { createTraveler } = useTraveler();
  const { user } = useAppSelector((state) => state.auth);
  const { first_name, last_name, gender, email, primary_lang, other_lang } = {
    ...user,
  };
  const {
    accessibility,
    interests,
    phone,
    dietary_restrictions,
    nationality,
    emergency_contact,
  } = {
    ...user?.traveler,
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      first_name,
      last_name,
      gender: gender?.value,
      email,
      primary_lang,
      other_lang,
      accessibility,
      interests,
      nationality,
      dietary_restrictions,
      phone,
      emergency_contact,
    },
  });

  const handleFormSubmit = (data: IFormInput) => {
    setLoading(true);
    createTraveler(data)
      .then((res) => {
        setLoading(false);
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender?.value,
        email: user.email,
        primary_lang: user.primary_lang,
        other_lang: user.other_lang,
        accessibility: user.traveler?.accessibility,
        interests: user.traveler?.interests,
        nationality: user.traveler?.nationality,
        dietary_restrictions: user.traveler?.dietary_restrictions,
        phone: user.traveler?.phone,
        emergency_contact: user.traveler?.emergency_contact,
      });
    }
  }, [user, setValue]);

  useEffect(() => {
    if (!page) {
      setPage(true);
    }
  }, []);

  return (
    page &&   (
      <form method="POST" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormItem
          label="First Name"
          className="mb-4"
          error={errors.first_name as FieldError}
        >
          <Input
            placeholder="John"
            {...register("first_name", {
              required: "Please enter your first name",
            })}
          />
        </FormItem>
        <FormItem
          label="Last Name"
          className="mb-4"
          error={errors.last_name as FieldError}
        >
          <Input
            placeholder="Doe"
            {...register("last_name", {
              required: "Please enter your last name",
            })}
          />
        </FormItem>

        <FormItem
          label="Gender"
          className="mb-4"
          error={errors.gender as FieldError}
        >
          <Select
            {...register("gender", { required: "Please select your gender" })}
          >
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </Select>
        </FormItem>

        <FormItem
          label="Email"
          className="mb-4"
          error={errors.email as FieldError}
        >
          <Input
            placeholder="example@email.com"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
        </FormItem>

        <FormItem
          label="Phone number"
          className="mb-4"
          error={errors.phone as FieldError}
        >
          <PhoneInput
            placeholder="003 888 232"
            name="phone"
            register={register}
            required={true}
          />
        </FormItem>

        <FormItem
          label="Nationality"
          className="mb-4"
          error={errors.nationality as FieldError}
        >
          <Input
            placeholder="003 888 232"
            {...register("nationality", {
              required: "Please enter your Nationality",
            })}
          />
        </FormItem>

        <FormItem
          label="Dietary restrictions"
          className="mb-4"
          error={errors.dietary_restrictions as FieldError}
        >
          <Textarea
            placeholder="Enter restrictions"
            {...register("dietary_restrictions", {
              required: "Please enter your restrictions",
            })}
          />
        </FormItem>

        <FormItem
          label="Accessibility"
          className="mb-4"
          error={errors.accessibility as FieldError}
        >
          <TagsDropdown
            placeHolder="Choose your accessibility"
            options={accessibilityList}
            selectedItems={accessibility || []}
            onItemSelect={(items) => {
              setValue("accessibility", items);
            }}
          />
          <Input type="hidden" {...register("accessibility")} />
        </FormItem>

        <FormItem label="Interests" className="mb-4">
          <TagsDropdown
            placeHolder="Choose your interests"
            options={interestList}
            selectedItems={interests || []}
            onItemSelect={(items) => {
              setValue("interests", items);
            }}
          />
          <Input type="hidden" {...register("interests")} />
        </FormItem>

        <FormItem
          label="Primary language"
          className="mb-4"
          error={errors.primary_lang as FieldError}
        >
          <Input
            placeholder="003 888 232"
            {...register("primary_lang", {
              required: "Please enter the primary language",
            })}
          />
        </FormItem>

        <FormItem
          label="Other languages"
          className="mb-4"
          error={errors.other_lang as FieldError}
        >
          <TagsDropdown
            placeHolder="Choose any other languages"
            options={["English", "Sinhala", "Tamil"]}
            selectedItems={other_lang || []}
            onItemSelect={(items) => {
              setValue("other_lang", items);
            }}
          />
          <Input type="hidden" {...register("other_lang")} />
        </FormItem>

        <h4 className="text-lg mt-10 mb-5">Emergency Contact</h4>

        <FormItem
          label="Contact Name"
          className="mb-4"
          error={errors?.emergency_contact?.name as FieldError}
        >
          <Input
            placeholder="ex:- John Doe"
            {...register("emergency_contact.name", {
              required: "Please enter the contact name",
            })}
          />
        </FormItem>

        <FormItem
          label="Contact Email"
          className="mb-4"
          error={errors?.emergency_contact?.email as FieldError}
        >
          <Input
            placeholder="example@email.com"
            type="email"
            {...register("emergency_contact.email", {
              required: "Please enter the email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
        </FormItem>

        <FormItem
          label="Contact Phone Number"
          className="mb-4"
          error={errors?.emergency_contact?.phone as FieldError}
        >
          <PhoneInput
            placeholder="003 888 232"
            name="emergency_contact.phone"
            register={register}
            required={true}
          />
        </FormItem>

        {/* ---- */}
        <div className="pt-2">
          <ButtonPrimary type="submit" loading={loading}>
            Update info
          </ButtonPrimary>
        </div>
      </form>
    )
  );
};

export default AccountForm;
