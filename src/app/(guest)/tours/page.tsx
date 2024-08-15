import Heading2 from '@/components/shared/Heading2';
import Pagination from '@/components/shared/Pagination';
import TabFilters from '@/components/tours/TabFilters';
import { StayDataType } from '@/data/types';
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import StayCard from '@/components/home/partials/StayCard';

function Tours() {
  const data: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 12);
  return (
    <div className="container relative">
      <div className={`nc-SectionGridFilterCard pb-24 lg:pb-28`}>
        <Heading2
          heading="All tours around Sri Lanka"
          subHeading={
            <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
              1599 tours
              <span className="mx-2">·</span>
              Aug 12 - 18
              <span className="mx-2">·</span>2 Guests
            </span>
          }
        />

        <div className="mb-8 lg:mb-11">
          <TabFilters />
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {data.map((stay) => (
            <StayCard key={stay.id} data={stay} />
          ))}
        </div>
        <div className="flex mt-16 justify-center items-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Tours
