import React, { InputHTMLAttributes, useEffect } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import Input from "../shared/Input";
import { on } from "events";

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>;
  name: string;
  required?: boolean;
  onNumberChange?: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ name, required, register, onNumberChange, ...args }) => {
  const [value, setValue] = React.useState<string>("");

  useEffect(() => {
    if (value) {
      onNumberChange && onNumberChange(value);
    }
  }, [value]);

  if (!register) {
    return (
      <Input
        type="text"
        onChange={(e) => {
          const re = /^[0-9\+\-\b]+$/;
          if (re.test(e.target.value) || e.target.value === "") {
            setValue(e.target.value);
          } else {
            e.target.value = value;
          }
        }}
        name={name}
        {...args}
      />
    );
  }

  const { onChange, onBlur, ref }: UseFormRegisterReturn =
    register &&
    register(name, {
      required: required ? "This phone number field is required" : false,
      pattern: {
        value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        message: "Please enter a valid phone number",
      },
    });

  return (
    <Input
      type="text"
      onChange={(e) => {
        const re = /^[0-9\+\-\b]+$/;
        if (re.test(e.target.value) || e.target.value === "") {
          setValue(e.target.value);
          onChange(e);
        } else {
          e.target.value = value;
        }
      }}
      onBlur={onBlur}
      name={name}
      ref={ref}
      {...args}
    />
  );
};

export default PhoneInput;
