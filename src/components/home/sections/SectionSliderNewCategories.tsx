"use client";
import { FC, useEffect, useState } from "react";
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
import useTourCategory from "@/services/redux/actions/useTourCategory";
import { ICategory } from "@/services/redux/reducers/slices/TourCategorySlice";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Suggestions for discovery",
  subHeading = "Popular categories to recommends for you",
  className = "",
  itemClassName = "",
  itemPerRow = 5,
  categoryCardType = "card3",
  sliderStyle = "style1",
}) => {

  const { categories } = useTourCategory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);
  const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);
  const windowWidth = useWindowSize().width;

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

  const renderCard = (item: ICategory) => {
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

  useEffect(() => {
    if (categories.length > 0) {
      setCategoriesList(categories);
    }
  }, [categories]);

  return categoriesList && categoriesList.length > 0 && (
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
                {categoriesList?.length > 0 &&
                  categoriesList.map((item, indx) => (
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

          {categories?.length > currentIndex + numberOfItems ? (
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
