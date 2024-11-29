import { Booking, Payment } from "@/app/(common)/checkout/success/[payment_id]/page";
import moment from "moment";

const BookingDetails = ({
  booking,
  payment,
}: {
  booking: Booking;
  payment: Payment;
}) => {
  return (
    <div className="flex-grow flex flex-col mb-10">
      <h3 className="text-2xl font-semibold mb-6">More Details</h3>
      <div className="flex flex-col space-y-4">
        <div className="flex text-neutral-6000 dark:text-neutral-300">
          <span className="flex-1">First Name</span>
          <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
            {booking.first_name}
          </span>
        </div>
        <div className="flex text-neutral-6000 dark:text-neutral-300">
          <span className="flex-1">Last Name</span>
          <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
            {booking.last_name}
          </span>
        </div>
        <div className="flex text-neutral-6000 dark:text-neutral-300">
          <span className="flex-1">Email</span>
          <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
            {booking.email}
          </span>
        </div>
        <div className="flex text-neutral-6000 dark:text-neutral-300">
          <span className="flex-1">Phone</span>
          <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
            {booking.phone}
          </span>
        </div>
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
            ${booking.total}
          </span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span className="flex-1">Payment method</span>
          <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
            Credit card
          </span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span className="flex-1">Payment Ref</span>
          <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
            {payment.transaction_id}
          </span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span className="flex-1">Payment Status</span>
          <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
            {payment.status === 1 ? "Paid" : "Unpaid"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;