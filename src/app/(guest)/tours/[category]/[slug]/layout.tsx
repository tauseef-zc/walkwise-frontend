"use client";


import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import { Route } from "next";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import BackgroundSection from "@/components/common/partials/BackgroundSection";
import SectionSliderNewCategories from "@/components/home/sections/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/home/sections/SectionSubscribe2";
import { PHOTOS } from "./page";
import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

const DetailLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  const imageGallery: ListingGalleryImage[] = [...PHOTOS].map(
    (item, index): ListingGalleryImage => {
      return {
        id: index,
        url: item,
      };
    }
  );

  return (
    <div className="ListingDetailPage mt-10">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={imageGallery}
      />

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div>

      {/* STICKY FOOTER MOBILE */}
      {/* <MobileFooterSticky /> */}
    </div>
  );
};

export default DetailLayout;
