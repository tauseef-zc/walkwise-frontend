import React from 'react';
import StartRating from '../home/partials/StartRating';
import ButtonPrimary from '../shared/ButtonPrimary';
import StayDatesRangeInput from './partials/StayDatesRangeInput';
import GuestsInput from './partials/GuestsInput';

const TourSidebar = () => {
  return (
    <div className="listingSectionSidebar__wrap shadow-xl">
      {/* PRICE */}
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          $19
          <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
            /person
          </span>
        </span>
        <StartRating />
      </div>

      {/* FORM */}
      {/* FORM */}
      <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
        <StayDatesRangeInput className="flex-1 z-[11]" />
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        <GuestsInput className="flex-1" />
      </form>

      {/* SUM */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>$19 x 3 adults</span>
          <span>$57</span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>Service charge</span>
          <span>$0</span>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$199</span>
        </div>
      </div>

      {/* SUBMIT */}
      <ButtonPrimary href={"/checkout"}>Reserve</ButtonPrimary>
    </div>
  );
}

export default TourSidebar;
