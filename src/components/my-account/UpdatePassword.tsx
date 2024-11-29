"use client";
import { useApi } from "@/hooks/useApi";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../shared/Input";
import FormItem from "../onboarding/FormItem";
import ButtonPrimary from "../shared/ButtonPrimary";

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (data.newPassword !== data.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/auth/update-password", {
        current_password: data.currentPassword,
        password: data.newPassword,
        password_confirmation: data.confirmPassword,
      });

      if (response.status < 300 && response.status >= 200) {
        setSuccess(true);
        setLoading(false);
        reset();
      }
    } catch (err) {
      setError("Failed to update password.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Update Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem label="Current Password" error={errors.currentPassword}>
          <Input
            type="password"
            id="currentPassword"
            {...register("currentPassword", {
              required: "Current password is required.",
            })}
            className={`${errors.currentPassword && "border border-red-500"}`}
          />
        </FormItem>

        <FormItem label="New Password" error={errors.newPassword}>
          <Input
            type="password"
            id="newPassword"
            {...register("newPassword", {
              required: "New password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            })}
            className={`${errors.newPassword && "border border-red-500"}`}
          />
        </FormItem>

        <FormItem label="Current Password" error={errors.confirmPassword}>
          <Input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your new password.",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match.",
            })}
            className={`${errors.confirmPassword && "border border-red-500"}`}
          />
        </FormItem>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-green-600">
            Password updated successfully!
          </p>
        )}

        <ButtonPrimary type="submit" loading={loading}>
          Update Password
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default UpdatePassword;
