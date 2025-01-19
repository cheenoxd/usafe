import { useEffect, useState } from "react";
import { api } from "../api";

const useTrackUserLocation = (userId: string) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is required to track location.");
      return;
    }

    const updateLocation = async (latitude: number, longitude: number) => {
      const numericUserId = Number(userId); // Convert userId to a number
      const location = await api.location.findFirst({
        filter: { userIdz: { equals: numericUserId } },
      });

      if (location) {
        await api.location.update(location.id, { latitude, longitude });
      } else {
        await api.location.create({
          userIdz: numericUserId,
          latitude,
          longitude,
        });
      }
    };


    const trackLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            updateLocation(latitude, longitude); // Call updateLocation when location changes
          },
          (err) => {
            console.error("Error fetching location:", err);
            setError("Failed to fetch location.");
          },
          {
            enableHighAccuracy: true, // Use high accuracy for better tracking
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    trackLocation(); // Start tracking location
  }, [userId]);

  return { error };
};

export default useTrackUserLocation;