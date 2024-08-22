import React, { InputHTMLAttributes } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import Input from "../shared/Input";

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>;
  name: string;
  required?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ name, required, register, ...args }) => {
  const [value, setValue] = React.useState<string>("");
  const { onChange, onBlur, ref }: UseFormRegisterReturn = register(name, {
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
