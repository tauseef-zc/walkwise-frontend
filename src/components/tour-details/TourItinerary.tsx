"use client";
import { TourDay } from "@/data/tours";
import React, { FC, useState } from "react";

type Props = {
  itineraries?: TourDay[];
};

const TourItinerary: FC<Props> = ({ itineraries }) => {
  const [tab, setTab] = useState<number>(0);
  const activeClass =
    "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500";
  const commonClass =
    "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer";

  return (
    itineraries && itineraries.length > 0 && (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Tour Itinerary</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {itineraries &&
            itineraries.length > 0 &&
            itineraries.map((_, index) => (
              <li className="me-2" key={index}>
                <span
                  aria-current="page"
                  onClick={() => setTab(index)}
                  className={
                    "inline-block p-4 rounded-t-lg " +
                    (tab == index ? activeClass : commonClass)
                  }
                >
                  {`Day ${index + 1}`}
                </span>
              </li>
            ))}
        </ul>

        {/* CONTENT */}
        {itineraries && itineraries.length > 0 && (
          <>
            <div>
              <h4 className="mt-3 mb-5">
                {itineraries[tab] && itineraries[tab].title}
              </h4>
              <h4 className="text-lg font-semibold">Itinerary</h4>
              <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                {itineraries[tab] && itineraries[tab].itinerary}
              </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

            {/* CONTENT */}
            <div>
              <h4 className="text-lg font-semibold">Other Information</h4>
              <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
                <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <span>Accommodation</span>
                  <span>{itineraries[tab].accommodation}</span>
                </div>
                <div className="flex space-x-10 justify-between p-3">
                  <span>Meal plan</span>
                  <span>{itineraries[tab].meal_plan}</span>
                </div>
              </div>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

            {/* CONTENT */}
            <div>
              <h4 className="text-lg font-semibold">Location</h4>
              <div className="prose sm:prose">
                <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                  <li>{itineraries[tab].location.address}</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default TourItinerary;
