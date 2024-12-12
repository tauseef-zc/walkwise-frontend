import TourUpdateForm from "@/components/guide/tour/TourUpdateForm";
import { getTourById } from "@/services/server/tourActions";
import React from "react";

const EditTour = async ({
  params: { tour_id },
}: {
  params: { tour_id: number };
}) => {
  const tour = await getTourById(tour_id);
  
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <div className="flex justify-center">
        <div className="flex-grow mt-10 md:mt-0 max-w-3xl">
          <h2 className="text-3xl font-semibold">Update Tour - {tour.title}</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex-grow mt-10 md:mt-0 max-w-3xl p-10 bg-white dark:bg-neutral-800 shadow-lg rounded-xl">
          <TourUpdateForm tour={tour} />
        </div>
      </div>
    </div>
  );
};

export default EditTour;
