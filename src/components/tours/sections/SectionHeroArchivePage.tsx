"use client";

import React, { FC, ReactNode } from "react";
import imagePng from "@/assets/images/hero-right2.png";
import Image, { StaticImageData } from "next/image";
import SearchForm from "@/components/home/partials/SearchForm";

export interface SectionHeroArchivePageProps {
  title?: string;
  className?: string;
  listingType?: ReactNode;
  hideSearch: boolean;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  title = "All Tours",
  className = "",
  listingType,
  hideSearch = true,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex w-full lg:flex-row lg:items-center">
        <div
          className={`flex-shrink-0 lg:w-full flex flex-col items-start space-y-6 lg:space-y-10 xl:pr-14 lg:mr-10 xl:mr-0 ${
            !hideSearch ? "pb-14 lg:pb-64 xl:pb-64" : ""
          }`}
        >
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            {title}
          </h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            <i className="text-2xl las la-map-marked"></i>
            <span className="ml-2.5">Sri Lanka</span>
            <span className="mx-5"></span>
            {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-home"></i>
                <span className="ml-2.5">112 tours</span>
              </>
            )}
          </div>
        </div>
      </div>

      {!hideSearch && (
        <div className="hidden lg:flow-root w-full">
          <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
            <SearchForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionHeroArchivePage;
