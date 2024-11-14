"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";
import { PlaceResult } from "@/components/inputs/LocationInput";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  onLocationSelected: (place: PlaceResult | null) => void;
  defaultLocation: PlaceResult | null;
}

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  onLocationSelected,
  defaultLocation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const [value, setValue] = useState<any>(defaultLocation?.address ?? "");
  const [showPopover, setShowPopover] = useState(autoFocus);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  useEffect(() => {
    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      inputRef.current as HTMLInputElement,
      {
        componentRestrictions: { country: "LK" },
        fields: [
          "address_components",
          "geometry",
          "name",
          "place_id",
          "formatted_address",
        ],
        types: ["geocode"],
      }
    );

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      const location: PlaceResult = {
        placeId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        geocode: {
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
        },
      };
      setValue(place.formatted_address ?? "");
      onLocationSelected(location);
    });

    setAutocomplete(autocompleteInstance);

    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (defaultLocation !== null) {
      setValue(defaultLocation.address);
    }
  }, [defaultLocation]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  const handleSelectLocation = (item: string) => {
    setValue(item);
    setShowPopover(false);
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        // onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            autoFocus={showPopover}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && (
            <ClearDataButton
              onClick={() => {
                setValue("");
                onLocationSelected(null);
              }}
            />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}
    </div>
  );
};

export default LocationInput;
