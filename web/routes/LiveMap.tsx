import React, { useEffect, useState } from "react";
import { api } from "../api";
import MapComponent from "../components/MapComponent";

type Location = {
  id: string;
  userIdz: number | null;
  latitude: number;
  longitude: number;
};

export default function LiveMap() {
  const [locations, setLocations] = useState<Location[]>([]);

  // Fetch locations from the database
  async function fetchLocationsFromDB() {
    try {
      const records = await api.location.findMany();
      setLocations(
        records.map((record) => ({
          id: record.id,
          userIdz: record.userIdz ?? 0,
          latitude: record.latitude ?? 0,
          longitude: record.longitude ?? 0,
        }))
      );
    } catch (error) {
      console.error("Error fetching locations from database:", error);
    }
  }

  // Fetch the current location and save it to the database
  async function fetchCurrentLocationAndSave() {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Current location:", { latitude, longitude });

        try {
          await api.location.create({
            userIdz: 0, // Replace with the actual user ID
            latitude,
            longitude,
          });
          fetchLocationsFromDB(); // Refresh the map with the new location
        } catch (error) {
          console.error("Error saving current location to the database:", error);
        }
      },
      (error) => {
        console.error("Error fetching current location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  useEffect(() => {
    fetchLocationsFromDB();
    fetchCurrentLocationAndSave(); // Fetch and save current location on mount
  }, []);

  return (
    <div>
      <MapComponent
        locations={locations}
        addMarker={(latitude, longitude, label) => {
          console.log("Adding marker:", { latitude, longitude, label });
        }}
      />
    </div>
  );
}
