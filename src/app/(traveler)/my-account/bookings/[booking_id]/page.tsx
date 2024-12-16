
import BookingDetails from "@/components/payments/BookingDetails";
import BookingItem from "@/components/payments/checkout/BookingItem";
import TourReviewForm from "@/components/payments/TourReviewForm";
import { Payment } from "@/data/types";
import { getPayment } from "@/services/server/tourActions";
import { notFound } from "next/navigation";
import React from "react";



const BookingDetailPage = async ({
  params: { booking_id },
}: {
  params: { booking_id: string };
}) => {
  const payment = (await getPayment(booking_id)) as Payment;
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
    <div className="space-y-6 sm:space-y-8">
      <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8 bg-white dark:bg-neutral-900">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Booking Details (#{booking.id})
        </h2>
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
        <div className="flex flex-col sm:flex-row">
          <BookingDetails payment={payment} booking={booking} />
          <div className="flex-1 flex">
            <TourReviewForm booking={booking} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
