"use client";
import { useAppSelector } from "@/services/redux/hooks";
import moment from "moment";
import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  heading?: ReactNode;
  className?: string;
  total?: number;
  dates?: string;
  guests?: number;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading = "Stays in Tokyo",
  total = 0,
  dates = "",
  guests = 0,
}) => {

  const { data } = useAppSelector((state) => state.search);

  if (data?.dates) {
    if ("from" in data?.dates && "to" in data?.dates) {
      dates =
        moment(data.dates.from ?? new Date()).format("MMM DD") +
        " - " +
        moment(data.dates.to ?? new Date()).format("MMM DD");
    }
  }

  if("guests" in data) {
    guests =
      (data.guests?.guestAdults ?? 0) + (data.guests?.guestChildren ?? 0);
  }

  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">{heading}</h2>
      <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
        {total} tours
        <span className="mx-2">·</span>
        {dates}
        <span className="mx-2">·</span>
        {guests} Guests
      </span>
    </div>
  );
};

export default Heading2;
