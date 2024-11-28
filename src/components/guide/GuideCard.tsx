import React from 'react'
import Avatar from '../shared/Avatar';
import { StarIcon } from '@heroicons/react/24/solid';
import { TourGuide } from '@/data/tours';
import { getImage } from '@/lib/assets';
import ButtonPrimary from '../shared/ButtonPrimary';

const GuideCard = ({ className = "", guide }: { className?: string, guide: TourGuide }) => {
  return (
    <div
      className={`nc-CardAuthorBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7 
        [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
    >
      <Avatar
        sizeClass="w-20 h-20 text-2xl"
        radius="rounded-full"
        imgUrl={getImage(guide.avatar)}
        userName={guide.name}
      />
      <div className="mt-3">
        <h2 className={`text-base font-medium`}>
          <span className="line-clamp-1">{guide.name}</span>
        </h2>
        <span
          className={`block mt-1.5 text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {guide?.location?.name ?? "N/A"}
        </span>
      </div>
      <div className="py-2 px-5 mt-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center ">
        <span className="text-xs font-medium pt-[1px]">{guide.rating}</span>
        <StarIcon className="w-5 h-5 text-amber-500 ml-2 " />
      </div>
      <div>
        <ButtonPrimary href={'/guides/' + guide.id} className="mt-5 w-full">View Profile</ButtonPrimary>
      </div>
    </div>
  );
}

export default GuideCard;
