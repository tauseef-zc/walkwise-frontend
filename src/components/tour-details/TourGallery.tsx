"use client";
import React, { FC, useEffect } from "react";
import Image from "next/image";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { getImage } from "@/lib/assets";
import ListingImageGallery from "../listing-image-gallery/ListingImageGallery";
import { ListingGalleryImage } from "../listing-image-gallery/utils/types";

type TourImage = {
  id: number;
  image: string;
  thumbnail: string;
};
interface TourGalleryProps {
  images: TourImage[];
}

const TourGallery: FC<TourGalleryProps> = ({ images }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [load, setLoad] = React.useState(false);

  const handleOpenModalImageGallery = () => {
    setOpenModal(true);
  };

  const handleCloseModalImageGallery = () => {
    setOpenModal(false);
  };

  const imageGallery: ListingGalleryImage[] = images.map(
    (item, index): ListingGalleryImage => {
      return {
        id: index,
        url: getImage("/" + item.image) || "",
      };
    }
  );

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    load && (
      <>
        <header className="rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={handleOpenModalImageGallery}
            >
              <Image
                alt="photo 1"
                fill
                className="object-cover rounded-md sm:rounded-xl"
                src={getImage("/" + images[0].image) || ""}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-20 hover:bg-opacity-20 transition-opacity"></div>
            </div>
            {images.map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 2 ? "block" : ""
                }`}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    alt="photos"
                    fill
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={getImage("/" + item.thumbnail) || ""}
                    sizes="400px"
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-20 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="h-5 w-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
        {imageGallery && imageGallery.length > 0 && (
          <ListingImageGallery
            isShowModal={openModal}
            onClose={handleCloseModalImageGallery}
            images={imageGallery}
          />
        )}
      </>
    )
  );
};

export default TourGallery;
