import BookingItem from "@/components/payments/checkout/BookingItem";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { getPayment } from "@/services/server/tourActions";
import moment from "moment";
import { notFound } from "next/navigation";
import React from "react";


const SuccessPage = async ({ params }: { params: { payment_id: string } }) => {
  const payment_id = params.payment_id || "";

  if (!payment_id) {
    return notFound(); 
  }

  const payment = await getPayment(payment_id);

  if (!payment) {
    return notFound(); // Redirect if payment is not found
  }

  const {
    booking,
    booking: { tour },
  } = payment;

  const guests = {
    guestAdults: booking?.adults || 0,
    guestChildren: booking?.children || 0,
    guestInfants: booking?.infants || 0,
  };

  console.log(payment);

  return (
    <div className="nc-PayPage">
      <main className="container mt-11 mb-24 lg:mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Congratulations 🎉
            </h2>

            <p className="text-neutral-600 dark:text-neutral-300">
              Your booking has been successfully completed.
            </p>

            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

            {/* Booking Item */}
            {tour && (
              <BookingItem
                tour={tour}
                guests={guests}
                bookingDate={booking?.booking_date || ""}
              />
            )}

            {/* Booking Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Booking Details</h3>
              <div className="flex flex-col space-y-4">
                <BookingDetail label="First Name" value={booking?.first_name} />
                <BookingDetail label="Last Name" value={booking?.last_name} />
                <BookingDetail label="Email" value={booking?.email} />
                <BookingDetail label="Phone" value={booking?.phone} />
                <BookingDetail label="Booking Code" value={`#${booking?.id}`} />
                <BookingDetail
                  label="Payment Date"
                  value={moment(payment?.payment_date).format("DD/MM/YYYY")}
                />
                <BookingDetail
                  label="Total"
                  value={`$${Number(payment?.amount)?.toFixed(2)}`}
                />
                <BookingDetail label="Payment Method" value="Credit Card" />
              </div>
            </div>

            {/* Explore More */}
            <div>
              <ButtonPrimary href="/tours">Explore More Tours</ButtonPrimary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface BookingDetailProps {
  label: string;
  value?: string | number;
}

const BookingDetail: React.FC<BookingDetailProps> = ({ label, value }) => (
  <div className="flex text-neutral-600 dark:text-neutral-300">
    <span className="flex-1">{label}</span>
    <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
      {value || "N/A"}
    </span>
  </div>
);

export default SuccessPage;
