"use client";
import StayCard from "@/components/home/partials/StayCard";
import Pagination from "@/components/shared/Pagination";
import { Tour } from "@/data/tours";
import useLikedTours from "@/services/redux/actions/useLikedTours";
import { useAppDispatch } from "@/services/redux/hooks";
import { dislikeTour } from "@/services/redux/reducers/slices/LikedToursSlice";
import React, { FC, useEffect } from "react";

const WishList: FC = () => {
  
  const { tours, pagination, loading } = useLikedTours();
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold">Wishlist</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col md:flex-row">
        {loading && (
          <div className="w-full h-[300px] flex justify-center items-center">
            Loading...
          </div>
        )}
        {!loading && tours.length === 0 && (
          <div className="w-full h-[300px] flex justify-center items-center">
            No Tours Found
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {!loading &&
            tours.length > 0 &&
            tours.map((tour: Tour) => (
              <StayCard
                key={tour.id}
                data={tour}
                onRemoved={() => dispatch(dislikeTour(tour.id))}
              />
            ))}
        </div>
      </div>
      {!loading && pagination && Object.keys(pagination).length > 0 && (
        <div className="w-full">
          <Pagination pagination={pagination} pageUrl="/my-account/wishlist" />
        </div>
      )}
    </div>
  );
};

export default WishList;
