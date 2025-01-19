import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "../types/location";

const MapComponent = ({
  locations,
  addMarker,
}: {
  locations: Location[];
  addMarker: (latitude: number, longitude: number, label: string) => void;
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]); // Keep track of markers separately

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map("map").setView([0, 0], 2);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "",
      }).addTo(mapRef.current);

      // Fetch current location and add a marker
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Add marker for the user's current location
            const currentLocationMarker = L.marker([latitude, longitude])
              .addTo(mapRef.current!)
              .bindPopup("You are here")
              .openPopup();

            markersRef.current.push(currentLocationMarker);

            // Center the map on the user's location
            mapRef.current?.setView([latitude, longitude], 12);
          },
          (error) => {
            console.error("Error fetching current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    // Add new markers for other locations
    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(mapRef.current!)
        .bindPopup(`User: ${location.userId}`);
      markersRef.current.push(marker);
    });

    // Cleanup markers on re-render
    return () => {
      markersRef.current.forEach((marker) => {
        mapRef.current?.removeLayer(marker);
      });
      markersRef.current = [];
    };
  }, [locations]);

  // Example for triggering addMarker when the map is clicked
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        addMarker(lat, lng, "New Marker");
      });
    }
  }, [addMarker]);

  return (
    <div
      id="map"
      style={{
        height: "850px", // Make the map cover the full viewport height
        width: "850px", // Make the map width responsive
      }}
    ></div>
  );
};

export default MapComponent;