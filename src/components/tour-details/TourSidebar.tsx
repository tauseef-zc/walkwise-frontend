"use client";
import React, { FC } from "react";
import StartRating from "../home/partials/StartRating";
import ButtonPrimary from "../shared/ButtonPrimary";
import StayDatesRangeInput from "./partials/StayDatesRangeInput";
import GuestsInput, { GuestsObject } from "./partials/GuestsInput";
import { Tour, TourDates } from "@/data/tours";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { setCookie } from "cookies-next";
import { setCheckout, setTempCheckout } from "@/services/redux/reducers/slices/CheckoutSlice";
import { useRouter } from "next/navigation";

interface TourSidebarProps {
  tour: Tour;
}


const TourSidebar: FC<TourSidebarProps> = ({ tour }) => {
  const { user } = useAppSelector((state) => state.auth); 
  const { checkout } = useAppSelector((state) => state.checkout); 
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { tour_availability } = tour;
  const [dates, setDates] = React.useState<TourDates>({ from: null, to: null });
  const [guests, setGuests] = React.useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 0,
    guestInfants: 0,
  });
  const totalGuests = guests.guestAdults + guests.guestChildren;
  const totalPrice = tour.price;

  const validateDate = (selectedDates: TourDates) => {
    let validated = false;
    if (!selectedDates) return validated;
    const { from, to } = selectedDates;
    if (from && to) {
      tour_availability?.forEach((availability) => {
        if (
          new Date(availability.from) <= from &&
          new Date(availability.to) >= to
        ) {
          validated = true;
        }
      });
      return validated;
    }
  };

  const handleCheckout = () => {

    let checkout = {
      tour: tour,
      dates: dates,
      guests: guests,
      user: user,
      totalGuests: totalGuests,
      tourPrice: totalPrice,
      totalPrice: totalPrice * totalGuests,
    };

    if (user) {
      if (validateDate(dates)) {
        // redirect to checkout page
          dispatch(setCheckout(checkout));
          push("/checkout");
      } else {
      }
    } else {
      // redirect to login page
      setCookie("tmp_checkout", JSON.stringify(checkout));
      push("/login");
    }
  };

  return (
    <div className="listingSectionSidebar__wrap shadow-xl">
      {/* PRICE */}
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          ${totalPrice}
          <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
            /person
          </span>
        </span>
        <StartRating />
      </div>

      {/* FORM */}
      <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
        <StayDatesRangeInput
          className="flex-1 z-[11]"
          onChange={(dateObject: TourDates) => {
            setDates(dateObject);
          }}
          defaultValue={dates}
        />
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        <GuestsInput
          className="flex-1"
          guests={guests}
          onChange={(item) => setGuests(item)}
        />
      </form>

      {/* AVAILABILITY */}
      {dates.from !== null && dates.to !== null && !validateDate(dates) && (
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-red-500 p-2 rounded dark:text-red-500 border border-red-500 dark:border-red-500">
            The selected dates are not available for this tour.
          </div>
        </div>
      )}

      {/* SUM */}
      {dates.from !== null && dates.to !== null && validateDate(dates) && (
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              ${totalPrice} x {totalGuests} adults
            </span>
            <span>${totalPrice * totalGuests}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalPrice * totalGuests}</span>
          </div>
        </div>
      )}

      {/* SUBMIT */}
      {dates.from !== null && dates.to !== null && validateDate(dates) && (
        <ButtonPrimary onClick={() => handleCheckout()}>Reserve</ButtonPrimary>
      )}
    </div>
  );
};

export default TourSidebar;
