import React, { FC } from "react";

type Props = {
  overview: string;
};

const TourOverview: FC<Props> = ({ overview }) => {
  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="text-neutral-6000 dark:text-neutral-300">
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default TourOverview;
