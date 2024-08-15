"use client";
import { useAuth } from "@/services/app/AuthService";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const OtpScreen = ({ searchParams }: { searchParams: any }) => {
  const { isAuthenticated, onboarding, verified } = useAppSelector(
    (state) => state.auth
  );
  const [otp, setOtp] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [canSend, setCanSend] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { sendVerification, verifyUser } = useAuth();
  const router = useRouter();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(false);
    if (otp.length === 6) {
      setLoading(true);
      verifyUser({
        email: searchParams?.email || "",
        otp: otp.join(""),
        verify_email: true,
      })
        .then((response) => {
          setLoading(false);
          setError("");
          router.replace("/login");
          toast("You account is verified, Please login to continue.", {
            type: "success",
            theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
          });
        })
        .catch((error) => {
          setLoading(false);
          setOtp([]);
          console.log({error});
          setError("Invalid OTP entered! Please try again.");
        });
    }
  };

  const handleSendVerification = () => {
    if (canSend) {
      setError("");
      setLoading(true);
      setCanSend(false);
      sendVerification(searchParams?.email || "")
        .then((response) => {
          setLoading(false);
          setTimeout(() => {
            setCanSend(true);
          }, 5000);
        })
        .catch((error) => {
          setLoading(false);
          setError("Something went wrong! Please try again.");
        });
    }
  };

  if (verified && isAuthenticated && onboarding) {
    redirect("/onboarding");
  } else if (verified && isAuthenticated && !onboarding) {
    redirect("/dashboard");
  }

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
        <form id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {Array(6)
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
                  disabled={loading}
                />
              ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-8">
            <button
              disabled={loading}
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
          <p className="text-center text-red-500 text-sm mt-10">{error}</p>
        </form>
        <div className="text-sm text-slate-500 text-center mt-16">
          {"Didn't receive code? "}
          {canSend && (
            <button
              className="font-medium text-indigo-500 hover:text-indigo-600"
              type="button"
              onClick={handleSendVerification}
            >
              Resend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;