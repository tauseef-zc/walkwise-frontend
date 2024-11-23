import BackgroundSection from "@/components/common/partials/BackgroundSection";
import GlassBackground from "@/components/home/GlassBackground";
import SectionSliderNewCategories from "@/components/home/sections/SectionSliderNewCategories";
import SectionSubscribe from "@/components/home/sections/SectionSubscribe";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <div className={`nc-ListingStayPage relative `}>
      <GlassBackground />

      {children}

      <div className="container overflow-hidden">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Suggestions for discovery"
            subHeading="Popular categories to recommends for you"
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
