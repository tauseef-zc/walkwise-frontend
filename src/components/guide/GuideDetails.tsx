import { TourGuide } from "@/data/tours";
import StartRating from "../home/partials/StartRating";
import Avatar from "../shared/Avatar";
import { FC } from "react";
import moment from "moment";
import { getImage } from "@/lib/assets";

interface GuideDetailProps {
  guide: TourGuide;
}

const GuideDetails: FC<GuideDetailProps> = ({ guide }) => {
  return (
    <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
      <Avatar
        hasChecked={guide.is_verified}
        hasCheckedClass="w-6 h-6 -top-0.5 right-2"
        sizeClass="w-28 h-28"
        imgUrl={getImage(guide.avatar)}
        containerClassName="ring-2 ring-white dark:ring-neutral-900 shadow-lg"
      />

      <div className="space-y-3 text-center flex flex-col items-center">
        <h2 className="text-3xl font-semibold">{guide.name}</h2>
        <StartRating className="!text-base" point={guide.rating} />
      </div>

      <p className="text-neutral-500 dark:text-neutral-400">{guide.bio}</p>

      {/* <SocialsList
        className="!space-x-3"
        itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
      /> */}

      <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

      <div className="space-y-4">
        {guide.location && (
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {guide.location.address}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <span className="text-neutral-6000 dark:text-neutral-300">
            Speaking {guide?.user?.primary_lang}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-neutral-6000 dark:text-neutral-300">
            Joined in {moment(guide.created_at).format("MMM, YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
