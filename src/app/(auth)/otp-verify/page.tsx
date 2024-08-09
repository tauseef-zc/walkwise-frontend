"use client";
import { useState } from "react";

const OtpScreen = () => {
  const [otp, setOtp] = useState<string[]>([]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    let targetIndex = index;

    if (value.length > 1) {
      return;
    }

    if (value.length === 0) {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = "";
        return newOtp;
      });
      targetIndex = index - 1;

    } else {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = value;
        return newOtp;
      });
      targetIndex = index + 1;
    }
    

    document.getElementById(`input-${targetIndex}`)?.focus();
  };

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32 mt-32">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-1">User Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 5-digit verification code that was sent to your email
            address.
          </p>
        </header>
        <form id="otp-form">
          <div className="flex items-center justify-center gap-3">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="number"
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]"
                  maxLength={1}
                  min={0}
                  max={9}
                  autoFocus={index === 0}
                  required
                  value={otp[index] ?? ""}
                  onChange={(e) => handleOnChange(e, index)}
                />
              ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-8">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 text-center mt-16">
          {"Didn't receive code? "}
          <a
            className="font-medium text-indigo-500 hover:text-indigo-600"
            href="#0"
          >
            Resend
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
