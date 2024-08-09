import React from "react";
import { FC } from "react";
import Label from "../shared/Label";
import { FieldError } from "react-hook-form";

export interface FormItemProps {
  className?: string;
  label?: string;
  desc?: string;
  children?: React.ReactNode;
  error?: FieldError |undefined;
}

const FormItem: FC<FormItemProps> = ({
  children,
  className = "",
  label,
  desc,
  error
}) => {

  const errorMessage = error ? error.message : null;

  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <div className="mt-1">{children}</div>
      {error && (
        <span className="block mt-3 text-xs text-red-500">{errorMessage}</span>
      )}
      {desc && (
        <span className="block mt-3 text-xs text-neutral-500 dark:text-neutral-400 ">
          {desc}
        </span>
      )}
    </div>
  );
};

export default FormItem;
