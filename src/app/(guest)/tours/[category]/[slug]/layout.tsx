"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import { Route } from "next";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";
import { getTour } from "@/services/server/tourActions";

const DetailLayout = ({ children, params }: { children: ReactNode, params: { slug: string; category: string } }) => {
  const router = useRouter();
  const thisPathname = usePathname();

  const photos: string[] = [
    "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/3851949/pexels-photo-3851949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  ];

 
  return (
    <div className="ListingDetailPage mt-10">
      <div className="container ListingDetailPage__content">{children}</div>
    </div>
  );
};

export default DetailLayout;
