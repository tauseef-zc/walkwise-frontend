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
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  addSearch,
  SearchDate,
} from "@/services/redux/reducers/slices/SearchSlice";
import moment from "moment";

const SearchForm: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.search);
  const { place } = useGoogleLocation(data.placeId);
  const [location, setLocation] = useState<PlaceResult | null>(data.location);
  const [dates, setDates] = useState<SearchDate>(data.dates as SearchDate);
  const [guests, setGuests] = useState<GuestsObject>(data.guests);
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

    const totalGuests =
      (guests?.guestAdults ?? 0) + (guests?.guestChildren ?? 0);

    const query = await createSearchUrl({
      byLocation: JSON.stringify(location?.geocode || {}),
      placeId: location?.placeId || "",
      fromDate: dates?.from ? moment(dates.from).format("YYYY-MM-DD") : "",
      toDate: dates?.to ? moment(dates.to).format("YYYY-MM-DD") : "",
      byGuests: totalGuests,
    });

    router.push(`/tours?${query.toString()}`);
  };

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
        defaultValue={dates}
        onDatesChanged={(date: SearchDate) => {
          setDates(date);
        }}
      />
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <GuestsInput
        className="flex-1"
        defaultValue={guests}
        onSearchSubmit={(guests) => {
          setGuests(guests);
          submitSearch(location, dates, guests);
        }}
      />
    </form>
  );
};

export default SearchForm;
