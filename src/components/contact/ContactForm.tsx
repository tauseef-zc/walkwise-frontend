"use client";
import React, { useState } from "react";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";
import ButtonPrimary from "../shared/ButtonPrimary";
import FormItem from "../onboarding/FormItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { useApi } from "@/hooks/useApi";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await api.post("/contact-submit", data);

      if (response.status < 300 && response.status >= 200) {
        setSuccess(true);
        setLoading(false);
        reset();

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      setError("Failed to update password.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6"
      action="#"
      method="post"
    >
      <FormItem label="Name" error={errors.name}>
        <Input
          placeholder="Example Doe"
          type="text"
          className="mt-1"
          {...register("name", {
            required: "Please enter your name",
          })}
        />
      </FormItem>
      <FormItem label="Email Address" error={errors.email}>
        <Input
          {...register("email", {
            required: "Please enter your email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="example@example.com"
          className="mt-1"
        />
      </FormItem>
      <FormItem label="Message" error={errors.message}>
        <Textarea
          {...register("message", { required: "Please enter your message" })}
          name="message"
          className="mt-1"
          rows={6}
        />
      </FormItem>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">Password updated successfully!</p>
      )}
      <div>
        <ButtonPrimary type="submit" loading={loading}>
          Send Message
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default ContactForm;
