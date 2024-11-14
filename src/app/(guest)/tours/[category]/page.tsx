import React from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Heading2 from "@/components/shared/Heading2";
import TabFilters from "@/components/tours/TabFilters";
import Pagination from "@/components/shared/Pagination";
import StayCard from "@/components/home/partials/StayCard";
import SectionHeroArchivePage from "@/components/tours/sections/SectionHeroArchivePage";
import { getTourCategory, searchTours } from "@/services/server/tourActions";
import { TourCategory as CategoryType, Tour } from "@/data/tours";

const TourCategory = async ({
  params: { category },
  searchParams,
}: {
  params: { category: string };
  searchParams: any;
}) => {
  const currentPage = `/tours/${category}/`;
  const categoryData = await getTourCategory(category);
  searchParams.byCategory = categoryData.id;
  const response = await searchTours(searchParams);
  const { data, meta } = response;

  return (
    <>
      <div className="container pt-10 pb-10 lg:pt-16 lg:pb-10">
        <SectionHeroArchivePage
          title={categoryData.category}
          currentPage="Experiences"
          listingType={<>
            <i className="text-2xl las la-umbrella-beach"></i>
            <span className="ml-2.5">{meta?.total ?? 0} tours</span>
          </>} searchParams={{
            placeId: undefined
          }}        />
      </div>
      <div className="container relative">
        <div className={`nc-SectionGridFilterCard pb-24 lg:pb-28`}>
          <Heading2
            heading={categoryData.category + " tours around Sri Lanka"}
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                {meta?.total ?? 0} tours
                <span className="mx-2">·</span>
                Aug 12 - 18
                <span className="mx-2">·</span>2 Guests
              </span>
            }
          />

          <div className="mb-8 lg:mb-11">
            <TabFilters searchParams={searchParams} defaultCategory={categoryData} />
          </div>
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {data.length > 0 &&
              response.data.map((stay: Tour) => (
                <StayCard key={stay.id} data={stay} />
              ))}
          </div>
          {response.data.length > 0 && (
            <div className="flex mt-16 justify-center items-center">
              <Pagination pagination={meta} pageUrl={currentPage} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TourCategory;
