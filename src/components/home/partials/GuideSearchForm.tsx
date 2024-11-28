"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import LocationInput from "./LocationInput";
import { PlaceResult } from "@/components/inputs/LocationInput";
import { GuestsObject } from "@/data/tours";
import { useRouter } from "next/navigation";
import { createSearchUrl } from "@/services/server/tourActions";
import useGoogleLocation from "@/hooks/useGoogleLocation";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  addSearch,
  SearchDate,
} from "@/services/redux/reducers/slices/SearchSlice";
import ButtonSubmit from "./ButtonSubmit";

const GuideSearchForm: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.search);
  const { place } = useGoogleLocation(data.placeId);
  const [location, setLocation] = useState<PlaceResult | null>(data.location);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setLocation(place);
  }, [place]);

  const submitSearch = async (
    location?: PlaceResult | null,
    dates?: SearchDate,
    guests?: GuestsObject
  ) => {
    dispatch(
      addSearch({ location, dates, guests, placeId: location?.placeId })
    );

    const query = await createSearchUrl({
      byLocation: JSON.stringify(location?.geocode || {}),
    });

    router.push(`/guides?${query.toString()}`);
  };

  return (
    <form
      action="/tours"
      className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800"
      ref={formRef}
    >
      <LocationInput
        className="flex-[1.5]"
        desc="Find a tour guide for a particular location!"
        onLocationSelected={(place: PlaceResult | null) => {
          setLocation(place);
          submitSearch(place);
        }}
        defaultLocation={place}
      />
      <div className="pr-2 xl:pr-4 flex items-center justify-center">
        <ButtonSubmit
          isSubmit={true}
          onClick={() => {
            submitSearch(location);
          }}
        />
      </div>
    </form>
  );
};

export default GuideSearchForm;
