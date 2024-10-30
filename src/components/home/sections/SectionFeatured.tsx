"use client";
import { useEffect, useState } from "react";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import useData from "@/services/app/DataService";

const SectionFeatured = () => {
  const [tours, setTours] = useState([]);
  const { getFeaturedTours } = useData();

  useEffect(() => {
    const featuredTours = async () => {
      const { data } = await getFeaturedTours();
      setTours(data);
    };
    
    if (tours.length === 0) {
      featuredTours();
    }
  }, [getFeaturedTours, tours]);

  return <SectionGridFeaturePlaces cardType="card1" tours={tours} />;
};

export default SectionFeatured;
