import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  label?: string;
  helpText?: string;
}

// eslint-disable-next-line react/display-name
const UploadInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label = "",  
      className = "relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary",
      children,
      helpText = "",
      ...args
    },
    ref
  ) => {
    return (
      <div className="mb-3 w-96">
        {label && (
          <label className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
            {label}
          </label>
        )}
        <input className={`${className}`} ref={ref} type="file" {...args} />
        { helpText && <p className="text-gray-500 text-sm">{helpText}</p> }
      </div>
    );
  }
);

export default UploadInput;
