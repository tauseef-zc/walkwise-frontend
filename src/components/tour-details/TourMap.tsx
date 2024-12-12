"use client";
import { Tour, TourDay } from "@/data/tours";
import React, { FC, useEffect } from "react";

interface TourMapProps {
  tour: Tour;
}

const TourMap: FC<TourMapProps> = ({ tour }) => {
  const [waypoints, setWaypoints] = React.useState<google.maps.LatLng[]>([]);
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const initMap = () => {
    const { AdvancedMarkerElement, PinElement } = google.maps.marker;
    const { Map } = google.maps;
    const lk = { lat: 7.8731, lng: 80.7718 };
    const map = new Map(document.getElementById("map") as HTMLElement, {
      zoom: 8,
      center: lk,
      mapId: "my_map",
    });

    if (waypoints.length > 0) {
      const origin = waypoints[0];
      const destination = waypoints[waypoints.length - 1];
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({ map });
      const formattedWaypoints = waypoints.map((point) => ({
        location: point,
        stopover: true,
      }));

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: formattedWaypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.setDirections(result);

            const pinTextGlyph = (letter: string) =>
              new PinElement({
                glyph: letter,
                glyphColor: "white",
              });

            waypoints.forEach((point, index) => {
              new AdvancedMarkerElement({
                position: point,
                map,
                content: pinTextGlyph(labels[index]).element,
              });
            });
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (tour && waypoints.length > 0) {
      initMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour, waypoints]);

  useEffect(() => {
    const points: google.maps.LatLng[] = [];

    if (!window?.google || !window?.google?.maps) return;

    if (tour.tour_days && tour.tour_days.length > 0) {
      points.push(new google.maps.LatLng(tour.start_location?.geocode));
      tour.tour_days.forEach((day: TourDay) => {
        if (day.location?.geocode?.lat && day.location?.geocode?.lng) {
          points.push(new google.maps.LatLng(day.location?.geocode));
        }
      });
      points.push(new google.maps.LatLng(tour.end_location?.geocode));
      setWaypoints(points);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour]);

  return (
    <div className="listingSection__wrap">
      {/* HEADING */}
      <h2 className="text-2xl font-semibold">Tour Map Overview</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div
        id="map"
        className="w-full h-[400px] border-radius rounded-3xl"
      ></div>
    </div>
  );
};

export default TourMap;
