import React from "react";

export interface iTourStep {
  step: number;
  name: string;
  description: string;
}

const TourSteps = ({
  steps,
  currentStep,
}: {
  steps: iTourStep[];
  currentStep: number;
}) => {
  return (
    <ol className="items-center justify-evenly w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse mb-10 p-5 border border-gray-200 dark:border-gray-700">
      {steps.map((step, index) => (
        <li
          className={
            "flex items-center space-x-2.5 rtl:space-x-reverse " +
            (currentStep === step.step
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 dark:text-gray-400")
          }
          key={index}
        >
          <span
            className={
              "flex items-center justify-center w-8 h-8 border rounded-full shrink-0 " +
              (currentStep === step.step
                ? "border-blue-600 dark:border-blue-500"
                : "border-gray-200 dark:border-gray-700")
            }
          >
            {step.step}
          </span>
          <span>
            <h3 className="font-medium leading-tight">{step.name}</h3>
            <p className="text-sm">{step.description}</p>
          </span>
        </li>
      ))}
    </ol>
  );
};

export default TourSteps;
