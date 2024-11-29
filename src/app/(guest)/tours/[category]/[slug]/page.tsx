import Review from "@/components/payments/checkout/Review";
import TourGallery from "@/components/tour-details/TourGallery";
import TourInfo from "@/components/tour-details/TourInfo";
import TourItinerary from "@/components/tour-details/TourItinerary";
import TourMap from "@/components/tour-details/TourMap";
import TourOverview from "@/components/tour-details/TourOverview";
import TourSidebar from "@/components/tour-details/TourSidebar";
import { getTour } from "@/services/server/tourActions";
import React from "react";

const TourDetail = async ({
  params,
}: {
  params: { slug: string; category: string };
}) => {
  const { slug } = params;
  const tour = await getTour(slug);

  return (
    <div className={` nc-ListingExperiencesDetailPage `}>
      {/* Gallery */}
      <TourGallery images={tour.images} />
      {/* Main */}
      <main className="relative z-10 mt-11  flex flex-col lg:flex-row pb-24 lg:pb-28">
        {/* Content */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          <TourInfo tour={tour} />
          <TourOverview overview={tour.overview} />
          <TourItinerary itineraries={tour.tour_days} />
          <TourMap tour={tour} />
          <Review tour={tour} />
        </div>
        {/* Sidebar */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0 ">
          <div className="sticky top-28">
            <TourSidebar tour={tour} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TourDetail;
