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
