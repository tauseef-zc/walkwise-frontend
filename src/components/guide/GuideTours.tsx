"use client";
import { Tour, TourGuide, TourMeta } from "@/data/tours";
import { FC, useEffect, useState } from "react";
import StayCard from "../home/partials/StayCard";
import Pagination from "../shared/Pagination";

interface GuideToursProps {
  guide: TourGuide;
  data: Tour[];
  meta: TourMeta;
}
const GuideTours: FC<GuideToursProps> = ({ guide, data, meta }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    loading && (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">{`${guide.name}'s tours`}</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {`${guide.name}'s listings is very rich, 5 star reviews help him to be
            more branded.`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
            {data.length > 0 &&
              data.map((stay) => <StayCard key={stay.id} data={stay} />)}
          </div>
          <div className="flex mt-11">
            {meta.total > 0 && (
              <Pagination pagination={meta} pageUrl={"guides/" + guide.id} />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default GuideTours;
