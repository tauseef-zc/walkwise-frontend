import { Booking } from "@/app/(common)/checkout/success/[payment_id]/page";
import BookingDetails from "@/components/payments/BookingDetails";
import BookingItem from "@/components/payments/checkout/BookingItem";
import TourReviewForm from "@/components/payments/TourReviewForm";
import { notFound } from "next/navigation";
import React from "react";
import { get } from "@/lib/restApi";

export interface Payment {
  id: number;
  amount: number;
  status: number;
  payment_date: string;
  transaction_id: string;
  transaction_ref: string;
  created_at: string;
  booking: Booking;
}

export const getBooking = async (
  paymentId: number
): Promise<Booking | null> => {
  try {
    return (await get("/guides/bookings/" + paymentId)).data as unknown as Booking;
  } catch (error) {
    return null;
  }
};

const BookingDetailPage = async ({
  params: { booking_id },
}: {
  params: { booking_id: number };
}) => {

  const booking = (await getBooking(booking_id)) as Booking;
  if (!booking) return notFound();

  const { tour, payment } = booking;

  const guests = {
    guestAdults: booking.adults,
    guestChildren: booking.children,
    guestInfants: booking.infants,
  };

  if (payment) {
    payment.booking = booking;
  }
  
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
          <BookingDetails payment={payment as Payment} booking={booking} />
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
