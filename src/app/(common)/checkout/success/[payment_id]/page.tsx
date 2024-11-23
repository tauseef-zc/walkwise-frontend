import BookingItem from "@/components/payments/checkout/BookingItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { Tour } from "@/data/tours";
import { get } from "@/lib/restApi";
import moment from "moment";
import { notFound } from "next/navigation";
import React from "react";

export interface Payment {
  id: number;
  amount: number;
  status: number;
  payment_date: string;
  created_at: string;
  booking: {
    id: number;
    tour: Tour;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    adults: number;
    children: number;
    infants: number;
    booking_date: string;
    created_at: string;
  };
}

const getPayment = async (paymentId: string): Promise<Payment | null> => {
  try {
    return (await get("/payments/" + paymentId)) as unknown as Payment;
  } catch (error) {
    return null;
  }
};

const SuccessPage = async ({
  params: { payment_id },
}: {
  params: { payment_id: string };
}) => {

  const payment = await getPayment(payment_id);
  if (!payment) return notFound();

  const {
    booking,
    booking: { tour },
  } = payment;

  const guests = {
    guestAdults: booking.adults,
    guestChildren: booking.children,
    guestInfants: booking.infants,
  };

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Congratulation 🎉
            </h2>

            <p className="text-neutral-6000 dark:text-neutral-300">
              Your booking has been successfully completed.
            </p>

            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

            {/* ------------------------ */}
            {tour && (
              <BookingItem
                tour={tour}
                guests={guests}
                bookingDate={booking.booking_date}
              />
            )}

            {/* ------------------------ */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Booking detail</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Booking code</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    #{booking.id}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Payment date</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {moment(payment.payment_date).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Total</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    ${payment.amount}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Payment method</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    Credit card
                  </span>
                </div>
              </div>
            </div>
            <div>
              <ButtonPrimary href="/tours">Explore more tours</ButtonPrimary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuccessPage;
