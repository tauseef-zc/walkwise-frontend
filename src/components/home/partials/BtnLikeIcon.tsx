"use client";

import { useTours } from "@/services/app/TourService";
import { on } from "events";
import React, { FC, useEffect, useState } from "react";

export interface BtnLikeIconProps {
  tourId: number;
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  onDislike?: (tourId: number) => void;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  tourId,
  onDislike,
}) => {
  const [likedState, setLikedState] = useState(false);
  const [likedClass, setLikedClass] = useState("");
  const { addToWishlist, removeFromWishlist } = useTours();

  const handleLike = async () => {
    if (likedState) {
      setLikedClass("");
      await removeFromWishlist(tourId);
      onDislike && onDislike(tourId);
    } else {
      setLikedClass("nc-BtnLikeIcon--liked"); 
      await addToWishlist(tourId);
    }
    setLikedState(!likedState);
  };

  useEffect(() => {
    setLikedState(isLiked);
    setLikedClass(isLiked ? "nc-BtnLikeIcon--liked" : "");
  }, [isLiked]);

  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${colorClass} ${className} ${likedClass}`}
      data-nc-id="BtnLikeIcon"
      title="Save"
      onClick={() => handleLike()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={likedState ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default BtnLikeIcon;
