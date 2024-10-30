import React, { FC } from "react";
import { TaxonomyType } from "@/data/types";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";
import { ICategory } from "@/services/redux/reducers/slices/TourCategorySlice";
import useAssetsHelper from "@/utils/useAssetsHelper";

export interface CardCategory3Props {
  className?: string;
  taxonomy: ICategory;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
}) => {
  const { tours_count:count, category, slug, image } = taxonomy;
  const { getImage } = useAssetsHelper();
  return (
    <Link href={`/tours/${slug}`} className={`nc-CardCategory3 flex flex-col ${className}`}>
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
      >
        <Image
          src={image ? getImage("/" + image) : ""}
          className="object-cover w-full h-full rounded-2xl"
          alt="places"
          fill
          sizes="(max-width: 400px) 100vw, 300px"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {category}
        </h2>
        <span
          className={`block mt-1.5 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {convertNumbThousand(count || 0)} tours
        </span>
      </div>
    </Link>
  );
};

export default CardCategory3;
