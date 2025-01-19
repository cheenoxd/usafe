import React, { useEffect, useState } from "react";
import { api } from "../api";
import AlertButton from "../components/AlertButton";
import MapComponent from "../components/MapComponent";

type Location = {
  id: string;
  userIdz: number | null;
  latitude: number;
  longitude: number;
};

export default function LiveLocationMap() {
  const [locations, setLocations] = useState<Location[]>([]);

  // Fetch locations from the database
  async function fetchLocationsFromDB() {
    try {
      const records = await api.location.findMany(); // Fetch from the database
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

  // Add a new marker to the database
  async function addMarker(latitude: number, longitude: number, label: string) {
    try {
      const newLocation = await api.location.create({
        userIdz: 0, // Replace with actual user ID if available
        latitude,
        longitude,
      });
      console.log("New marker added:", { latitude, longitude, label });
      fetchLocationsFromDB(); // Refresh locations after adding a new one
    } catch (error) {
      console.error("Error adding marker:", error);
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

        // Save the current location to the database
        try {
          const newLocation = await api.location.create({
            userIdz: 0, // Replace with actual user ID if available
            latitude,
            longitude,
          });
          console.log("Current location added to the database:", newLocation);
          fetchLocationsFromDB(); // Refresh locations after adding a new one
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

  // Fetch locations and the current location on component mount
  useEffect(() => {
    fetchLocationsFromDB();
    fetchCurrentLocationAndSave(); // Automatically fetch and save current location
  }, []);

  return (
    <div>
      <MapComponent locations={locations} addMarker={addMarker} />
      <div style={{ marginTop: "20px", fontSize: "16px" }}>
        <button
          onClick={fetchCurrentLocationAndSave}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
          }}
        >
          Add My Current Location
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          gap: "10px",
        }}
      >
        <div
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "red",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          <AlertButton />
        </div>
      </div>
    </div>
  );
}