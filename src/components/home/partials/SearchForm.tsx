"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import LocationInput from "./LocationInput";
import GuestsInput from "./GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { PlaceResult } from "@/components/inputs/LocationInput";
import { GuestsObject } from "@/data/tours";
import { useRouter } from "next/navigation";
import { createSearchUrl } from "@/services/server/tourActions";
import useGoogleLocation from "@/hooks/useGoogleLocation";

const SearchForm: FC<{ placeId?: string }> = ({ placeId }) => {
  const { place } = useGoogleLocation(placeId);
  const [location, setLocation] = useState<PlaceResult | null>(place);
  const [dates, setDates] = useState<string>("");
  const [guests, setGuests] = useState<GuestsObject>();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setLocation(place);
  }, [place]);

  const submitSearch = (
    location?: PlaceResult | null,
    dates?: string,
    guests?: GuestsObject
  ) => {
    const query = createSearchUrl({
      byLocation: JSON.stringify(location?.geocode || {}),
      placeId: location?.placeId || "",
      byDates: dates,
      byGuests: JSON.stringify(guests || {}),
    });
    router.push(`/tours?${query.toString()}`);
  };

  const renderForm = () => {
    return (
      <form
        action="/tours"
        className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 "
        ref={formRef}
      >
        <LocationInput
          className="flex-[1.5]"
          onLocationSelected={(place: PlaceResult | null) => {
            setLocation(place);
            if (place == null) {
              submitSearch(place, dates, guests);
            }
          }}
          defaultLocation={place}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <StayDatesRangeInput
          className="flex-1"
          onDatesChanged={(date: string) => {
            setDates(date);
          }}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput
          className="flex-1"
          onSearchSubmit={(guests) => {
            setGuests(guests);
            submitSearch(location, dates, guests);
          }}
        />
      </form>
    );
  };

  return renderForm();
};

export default SearchForm;
