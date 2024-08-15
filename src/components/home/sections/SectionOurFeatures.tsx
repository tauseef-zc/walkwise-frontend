import React, { FC } from "react";
import rightImgPng from "@/assets/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import Badge from "@/components/shared/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image src={rightImg} alt="" />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          Benefits
        </span>
        <h2 className="font-semibold text-4xl mt-5">Authentic Tour Experiences</h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Pricing" />
            <span className="block text-xl font-semibold">
              Cost Effective
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              With a free listing, you can choose the tour within your budget
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Explore " />
            <span className="block text-xl font-semibold">
              Unique experience
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Millions of people are searching for unique experiences around
              the world
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Secure" />
            <span className="block text-xl font-semibold">
              Secure and Simple
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              A Holiday Lettings listing gives you a secure and easy way to take
              bookings and payments online
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;