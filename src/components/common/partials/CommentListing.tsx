import Avatar from "@/components/shared/Avatar";
import { TourReview } from "@/data/tours";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import React, { FC } from "react";
import { getImage } from "@/lib/assets";
import moment from "moment";

export interface CommentListingProps {
  className?: string;
  data: TourReview;
  hasListingTitle?: boolean;
}

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data,
  hasListingTitle,
}) => {
  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          sizeClass="h-10 w-10 text-lg"
          radius="rounded-full"
          userName={data.reviewer.name}
          imgUrl={getImage(data.reviewer.avatar)}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-md font-semibold">
              <span>{data.reviewer.name}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {moment(data.created_at).format("MMM DD, YYYY hh:mm A")}
            </span>
          </div>
          <div className="flex text-yellow-500">
            {Array(data.rating)
              .fill(0)
              .map((_, index) => (
                <StarIcon key={index} className="w-4 h-4" />
              ))}
            {Array(5 - data.rating)
              .fill(0)
              .map((_, index) => (
                <StarIconOutline key={index} className="w-4 h-4" />
              ))}
          </div>
        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
          {data.review}
        </span>
      </div>
    </div>
  );
};

export default CommentListing;
