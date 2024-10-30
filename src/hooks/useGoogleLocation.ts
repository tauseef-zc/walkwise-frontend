import { PlaceResult } from "@/components/inputs/LocationInput";
import { useState, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface AddressComponent {
  long: string;
  short: string;
  types: string[];
}

interface Photo {
  url: string;
  height: number;
  width: number;
}

interface GooglePlaceHookResult {
  place: PlaceResult | null;
  loading: boolean;
  error: Error | null;
}

interface PlaceRequestFields {
  [key: string]: boolean;
}

const defaultFields: PlaceRequestFields = {
  name: true,
  formatted_address: true,
  geometry: true,
  place_id: true,
  formatted_phone_number: true,
  website: true,
  rating: true,
  reviews: true,
  photos: true,
  opening_hours: true,
  address_components: true,
};

const useGoogleLocation = (
  placeId: string | undefined,
  customFields?: PlaceRequestFields
): GooglePlaceHookResult => {
  const [place, setPlace] = useState<PlaceResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    const getPlaceDetails = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );

        const fields = Object.keys(customFields || defaultFields).filter(
          (key) => (customFields || defaultFields)[key]
        ) as (keyof google.maps.places.PlaceResult)[];

        service.getDetails(
          {
            placeId: placeId!,
            fields: fields,
          },
          (
            result: google.maps.places.PlaceResult | null,
            status: google.maps.places.PlacesServiceStatus
          ) => {
            if (!isSubscribed) return;

            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              result
            ) {
              const placeData: PlaceResult = {
                name: result.name!,
                address: result.formatted_address!,
                geocode: {
                  lat: result.geometry!.location!.lat(),
                  lng: result.geometry!.location!.lng(),
                },
                placeId: result.place_id!,
              };

              setPlace(placeData);
              setLoading(false);
            } else {
              setError(new Error(`Place details request failed: ${status}`));
              setLoading(false);
            }
          }
        );
      } catch (err) {
        if (isSubscribed) {
          setError(
            err instanceof Error ? err : new Error("An unknown error occurred")
          );
          setLoading(false);
        }
      }
    };

    if (placeId) {
      getPlaceDetails();
    } else {
      setLoading(false);
    }

    return () => {
      isSubscribed = false;
    };
  }, [placeId, customFields]);

  return { place, loading, error };
};

export default useGoogleLocation;
