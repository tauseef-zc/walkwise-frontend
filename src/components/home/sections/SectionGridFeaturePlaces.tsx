import React, { FC, ReactNode } from "react";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import StayCard from "../partials/StayCard";
import StayCard2 from "../partials/StayCard2";
import Heading from "@/components/shared/Heading";
import { FeaturedTour, Tour } from "@/data/tours";

//
export interface SectionGridFeaturePlacesProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  cardType?: "card1" | "card2";
  tours?: FeaturedTour[] | Tour[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Featured tours",
  subHeading = "Explore top-rated tours and experiences",
  cardType = "card2",
  tours = [],
}) => {
  const renderCard = (stay: Tour | FeaturedTour) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard;
    }

    return <CardName key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <div className="flex flex-col mb-8 relative">
        <Heading desc={subHeading}>{heading}</Heading>
      </div>
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {tours.length > 0 && tours.map((stay) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {tours.length === 8 && <ButtonPrimary>Show me more</ButtonPrimary>}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
