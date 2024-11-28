import React from "react";
import GlassBackground from "@/components/home/GlassBackground";
import SectionHeroGuidePage from "@/components/guide/SectionHeroArchivePage";
import GuideCard from "@/components/guide/GuideCard";
import { searchGuides } from "@/services/server/guideActions";
import Pagination from "@/components/shared/Pagination";

export interface GuideListingProps extends URLSearchParams {
  byLocation?: string;
  [key: string]: any;
}

const TourGuidesListing = async ({
  searchParams,
}: {
  searchParams: GuideListingProps;
}) => {
  const response = await searchGuides(searchParams);
  const { data, meta } = response;

  return (
    <main className="nc-PageHome relative overflow-hidden">
      <GlassBackground />
      <div className="container relative mt-16">
        <SectionHeroGuidePage
          title="Tour Guides"
          listingType={
            <>
              <i className="text-2xl las la-user"></i>
              <span className="ml-2.5">{meta?.total ?? 0} guides</span>
            </>
          }
          hideSearch={false}
        />
        <div className="min-h-screen flex flex-col items-center mb-16">
          {/* Guides Listing Section */}
          <div className="container mx-auto px-4 py-10 flex flex-col items-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Sample Cards for Guides */}
              {data.length > 0 &&
                data.map((item, index) => (
                  <GuideCard key={index} guide={item} />
                ))}
            </div>
            <div className="w-full flex mt-16 justify-center items-center">
              <Pagination pagination={meta} pageUrl="/guides" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TourGuidesListing;
