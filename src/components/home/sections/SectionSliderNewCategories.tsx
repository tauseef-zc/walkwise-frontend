"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "@/components/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import CardCategory3 from "../partials/CardCategory3";
import CardCategory4 from "../partials/CardCategory4";
import CardCategory5 from "../partials/CardCategory5";
import PrevBtn from "../partials/PrevBtn";
import NextBtn from "../partials/NextBtn";
import { TaxonomyType } from "@/types/home";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay-map",
    name: "Cultural Heritage",
    taxonomy: "category",
    count: 17288,
    thumbnail:
      "https://images.pexels.com/photos/11138725/pexels-photo-11138725.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay-map",
    name: "Wildlife Safari",
    taxonomy: "category",
    count: 2118,
    thumbnail:
      "https://images.pexels.com/photos/27037673/pexels-photo-27037673/free-photo-of-cheetah-lying-in-sunlight-between-rocks.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay-map",
    name: "Tea Plantation",
    taxonomy: "category",
    count: 36612,
    thumbnail:
      "https://images.pexels.com/photos/10572399/pexels-photo-10572399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay-map",
    name: "Coastal & Beach",
    taxonomy: "category",
    count: 18188,
    thumbnail:
      "https://images.pexels.com/photos/11495843/pexels-photo-11495843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/listing-stay-map",
    name: "Ayurveda and Wellness",
    taxonomy: "category",
    count: 2118,
    thumbnail:
      "https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay-map",
    name: "Cultural & Religious",
    taxonomy: "category",
    count: 22288,
    thumbnail:
      "https://images.pexels.com/photos/19710785/pexels-photo-19710785/free-photo-of-low-angle-shot-of-an-ornamental-mosque.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "6",
    href: "/listing-stay-map",
    name: "Romantic Tours",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/8968391/pexels-photo-8968391.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: "8",
    href: "/listing-stay-map",
    name: "Adventure and Eco",
    taxonomy: "category",
    count: 515,
    thumbnail:
      "https://images.pexels.com/photos/1001780/pexels-photo-1001780.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
];

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Suggestions for discovery",
  subHeading = "Popular categories to recommends for you",
  className = "",
  itemClassName = "",
  categories = DEMO_CATS,
  itemPerRow = 5,
  categoryCardType = "card3",
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth < 320) {
      return setNumberOfitem(1);
    }
    if (windowWidth < 500) {
      return setNumberOfitem(itemPerRow - 3);
    }
    if (windowWidth < 1024) {
      return setNumberOfitem(itemPerRow - 2);
    }
    if (windowWidth < 1280) {
      return setNumberOfitem(itemPerRow - 1);
    }

    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < categories?.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  const renderCard = (item: TaxonomyType) => {
    switch (categoryCardType) {
      case "card3":
        return <CardCategory3 taxonomy={item} />;
      case "card4":
        return <CardCategory4 taxonomy={item} />;
      case "card5":
        return <CardCategory5 taxonomy={item} />;
      default:
        return <CardCategory3 taxonomy={item} />;
    }
  };

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <Heading desc={subHeading} isCenter={sliderStyle === "style2"}>
        {heading}
      </Heading>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={`relative flow-root`} {...handlers}>
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap -mx-2 xl:-mx-4"
            >
              <AnimatePresence initial={false} custom={direction}>
                {categories.map((item, indx) => (
                  <motion.li
                    className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                    custom={direction}
                    initial={{
                      x: `${(currentIndex - 1) * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    variants={variants(200, 1)}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    {renderCard(item)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex ? (
            <PrevBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}

          {categories.length > currentIndex + numberOfItems ? (
            <NextBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}
        </div>
      </MotionConfig>
    </div>
  );
};

export default SectionSliderNewCategories;
