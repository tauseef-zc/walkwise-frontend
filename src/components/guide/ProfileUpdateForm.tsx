"use client";
import { FC, useEffect, useState } from 'react'
import FormItem from '../onboarding/FormItem';
import Input from '../shared/Input';
import ButtonPrimary from '../shared/ButtonPrimary';
import { FieldError, useForm } from 'react-hook-form';
import TagsDropdown from '../shared/Searchable/TagsDropdown';
import Textarea from '../shared/Textarea';
import Select from '../shared/Select';
import { useGuide } from '@/services/app/GuideService';
import { useAppSelector } from '@/services/redux/hooks';
import { toast } from 'react-toastify';
import expertiseList from '@/data/jsons/__abilities.json';

interface IFormInput {
    first_name: string;
    last_name: string;
    gender?: number;
    email: string;
    primary_lang: string;
    other_lang: string[];
    phone: string;
    bio?: string;
    expertise?: string[];
    experience?: number | null;
    has_vehicle?: boolean | number;
}

const ProfileUpdateForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const { createGuide } = useGuide();
  const { user } = useAppSelector((state) => state.auth);
  const { first_name, last_name, gender, email, primary_lang, other_lang } = {...user};
  const {
    expertise,
    bio,
    phone,
    experience,
    has_vehicle,
  } = {
    ...user?.guide,
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
      phone,
      bio,
      expertise,
      experience,
      has_vehicle,
    },
  });

  const handleFormSubmit = (data: IFormInput) => {
    setLoading(true);
    createGuide(data)
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
        phone: user.guide?.phone,
        bio: user.guide?.bio,
        expertise: user.guide?.expertise,
        experience: user.guide?.experience,
        has_vehicle: user.guide?.has_vehicle || 0,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, setValue]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient && (
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
        <Input
          placeholder="003 888 232"
          {...register("phone", { required: "Please enter your phone number" })}
        />
      </FormItem>

      <FormItem
        label="About Me"
        className="mb-4"
        error={errors.bio as FieldError}
      >
        <Textarea
          placeholder="About"
          {...register("bio", {
            required: "Please enter about me",
          })}
        />
      </FormItem>

      <FormItem
        label="Expertise"
        className="mb-4"
        error={errors.expertise as FieldError}
      >
        <TagsDropdown
          placeHolder="Choose your expertise"
          options={expertiseList}
          selectedItems={expertise || []}
          onItemSelect={(items) => {
            setValue("expertise", items);
          }}
        />
        <Input type="hidden" {...register("expertise")} />
      </FormItem>

      <FormItem
        label="Primary language"
        className="mb-4"
        error={errors.primary_lang as FieldError}
      >
        <Input
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

      <FormItem
        label="Experience"
        className="mb-4"
        error={errors.experience as FieldError}
      >
        <Input
          type="number"
          {...register("experience", {
            required: "Please enter your experience",
          })}
        />
      </FormItem>

      <FormItem
        label="Do you have a vehicle?"
        className="mb-4"
        error={errors.has_vehicle as FieldError}
      >
        <Select {...register("has_vehicle")}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </Select>
      </FormItem>

      {/* ---- */}
      <div className="pt-2">
        <ButtonPrimary type="submit" loading={loading}>
          Update info
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default ProfileUpdateForm;
