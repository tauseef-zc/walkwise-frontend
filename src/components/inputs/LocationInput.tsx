import React, { useEffect, useState } from "react";
import Input from "../shared/Input";

export interface PlaceResult {
  name?: string;
  geocode: {
    lat?: number;
    lng?: number;
  };
  address?: string;
  placeId?: string;
}

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onPlaceSelected: (place: PlaceResult) => void;
  defaultLocation?: object;
  type?: string;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  onPlaceSelected,
  defaultLocation = "",
  type = "cities",
  className = "w-full p-2 border border-gray-300 rounded",
  ...args
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const placeTypes: any = {
    cities: ["(cities)"],
    locations: ["geocode"],
    places: ["geocode", "establishment"],
  };

  const locationName = () => {
    if (defaultLocation) {
      onPlaceSelected(defaultLocation as PlaceResult);
      const location = defaultLocation as PlaceResult;
      return location.address;
    }
    return "";
  };

  useEffect(() => {
    if (!window?.google || !window?.google?.maps) return;

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
        types: placeTypes[type],
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
      onPlaceSelected(location);
    });

    setAutocomplete(autocompleteInstance);

    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPlaceSelected, window?.google?.maps]);

  return (
    <>
      <Input
        ref={inputRef}
        type="text"
        className={className}
        defaultValue={locationName()}
        {...args}
      />
    </>
  );
};

export default LocationInput;
