"use client";
import BackgroundSection from "@/components/common/partials/BackgroundSection";
import GlassBackground from "@/components/home/GlassBackground";
import SectionSliderNewCategories from "@/components/home/sections/SectionSliderNewCategories";
import SectionSubscribe from "@/components/home/sections/SectionSubscribe";
import SectionHeroArchivePage from "@/components/tours/sections/SectionHeroArchivePage";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  let regex = /\/tours\/([A-Za-z0-9]+)\/([A-Za-z0-9]+)/i;

  if (regex.test(path)) {
    return <>{children}</>;
  }

  return (
    <div className={`nc-ListingStayPage relative `}>
      <GlassBackground />
      <div className="container pt-10 pb-10 lg:pt-16 lg:pb-10">
        <SectionHeroArchivePage
          currentPage="Experiences"
          listingType={
            <>
              <i className="text-2xl las la-umbrella-beach"></i>
              <span className="ml-2.5">1599 tours</span>
            </>
          }
        />
      </div>

      {children}

      <div className="container overflow-hidden">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card3"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>

        <SectionSubscribe className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default Layout;
