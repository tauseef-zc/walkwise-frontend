"use client";
import React, { FC } from "react";
import StartRating from "./StartRating";
import BtnLikeIcon from "./BtnLikeIcon";
import SaleOffBadge from "./SaleOffBadge";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import GallerySlider from "./GallerySlider";
import { FeaturedTour, Tour } from "@/data/tours";
import { useAppSelector } from "@/services/redux/hooks";

export interface StayCardProps {
  className?: string;
  data: Tour | FeaturedTour;
  size?: "default" | "small";
  onRemoved?: (tourId: number) => void;
}

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data,
  onRemoved
}) => {
  const {
    images,
    category,
    title,
    slug,
    is_liked,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    guide,
    id,
  } = data;
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={images}
          href={"tours/" + category.slug + "/" + slug}
          galleryClass={size === "default" ? undefined : ""}
        />
        <BtnLikeIcon
          tourId={id}
          isLiked={is_liked}
          className="absolute right-3 top-3 z-[1]"
          onDislike={onRemoved}
        />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
        <div className={size === "default" ? "space-y-2" : "space-y-1"}>
          <Link
            href={"tours/" + category.slug}
            className="text-sm text-neutral-500 dark:text-neutral-400"
          >
            {category.category}
          </Link>
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <Link href={"tours/" + category.slug + "/" + slug}>
                <span className="line-clamp-1">{title}</span>
              </Link>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            <i className="las la-user-circle"></i>
            <span className="">{guide.name}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <Link href={"tours/" + category.slug + "/" + slug}>
            <span className="text-base font-semibold">${price}</span>
          </Link>
          {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${
        size === "default"
          ? "border border-neutral-100 dark:border-neutral-800 "
          : ""
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <div>{renderContent()}</div>
    </div>
  );
};

export default StayCard;
