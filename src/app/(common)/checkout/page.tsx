"use client";
import CheckoutContent from "@/components/payments/checkout/CheckoutContent";
import CheckoutForm, {
  Metadata,
} from "@/components/payments/checkout/CheckoutForm";
import Sidebar from "@/components/payments/checkout/Sidebar";
import { Checkout } from "@/services/app/CheckoutService";
import { useAppSelector } from "@/services/redux/hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutPage = () => {
  const [stripe, setStripe] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { checkout } = useAppSelector((state) => state.checkout);
  const { push } = useRouter();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC ?? "");

  React.useEffect(() => {
    if (!stripe) {
      setStripe(true);
    }
  }, [stripe]);

  if (!Object.keys(checkout).length) {
    push("/");
  }

  if (!user) {
    push("/login");
  }

  return (
    stripe && (
      <div className={`nc-CheckOutPagePageMain`}>
        <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
            <CheckoutContent>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </CheckoutContent>
          </div>
          <div className="hidden lg:block flex-grow">
            {Object.keys(checkout).length > 0 && (
              <Sidebar checkout={checkout as Checkout} />
            )}
          </div>
        </main>
      </div>
    )
  );
};

export default CheckoutPage;
