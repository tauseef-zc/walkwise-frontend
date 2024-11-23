import React, { FC, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCheckout, { Checkout } from "@/services/app/CheckoutService";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useAppSelector } from "@/services/redux/hooks";
import { useRouter } from "next/navigation";

export interface Metadata {
  chargeAmount: string;
  userId: number;
  tourId: number;
  guestAdults: number;
  guestChildren: number;
  guestInfants: number;
  startDate: Date | string;
  endDate: Date | string;
  totalGuests: number;
}

interface CheckoutFormProps {
  
}

const cardElementOptions = {
  hidePostalCode: true,
};

const CheckoutForm: FC<CheckoutFormProps> = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const { getPaymentIntent, confirmPayment } = useCheckout();
  const { checkout } = useAppSelector((state) => state.checkout);
  const { push } = useRouter();

  const checkoutObj = checkout as Checkout;
  const totalPrice = checkoutObj?.totalPrice ?? 0;
  const description = "WalkWise - " + (checkoutObj?.tour?.title ?? "");
  const metadata: Metadata = {
    chargeAmount: totalPrice.toString(),
    userId: checkoutObj?.user?.id ?? 0,
    tourId: checkoutObj?.tour?.id ?? 0,
    guestAdults: checkoutObj?.guests?.guestAdults ?? 0,
    guestChildren: checkoutObj?.guests?.guestChildren ?? 0,
    guestInfants: checkoutObj?.guests?.guestInfants ?? 0,
    startDate: checkoutObj?.dates?.from ?? "",
    endDate: checkoutObj?.dates?.to ?? "",
    totalGuests: checkoutObj?.totalGuests ?? 0,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const { clientSecret } = await getPaymentIntent({
      amount: totalPrice,
      description,
      metadata,
      billing: checkoutObj?.billingDetails ?? {},
    });

    const cardElement = elements && elements.getElement(CardElement);

    if (!stripe) throw new Error("Stripe instance is not loaded");
    if (!cardElement) throw new Error("Card element is not loaded");

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error && error.message) {
      setError(error.message ?? "An unexpected error has occurred.");
    } else if (paymentIntent) {
      setError(null);
      const { status, payment_id } = await confirmPayment(paymentIntent.id);
      if (status == "success") {
        setLoading(false);
        push("/checkout/success/" + payment_id);
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-lg shadow-lg p-4 bg-white dark:bg-gray-800 border border-gray-300">
        <CardElement options={cardElementOptions} className="payments" />
      </div>
      <div className="mt-10">
        <ButtonPrimary loading={loading} disabled={!stripe || loading}>
          Confirm Payment
        </ButtonPrimary>
      </div>
      {error && <div className="mt-6 text-red-500">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
