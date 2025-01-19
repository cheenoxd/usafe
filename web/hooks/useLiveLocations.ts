import { useFindMany } from "@gadgetinc/react";
import { api } from "../api";
import { Location } from "../types/location";

const useLiveLocations = (currentUserId: number) => {
  const [{ data, fetching, error }] = useFindMany(api.location, {
    live: true,
    select: {
      __typename: true,
      id: true,
      userIdz: true,
      latitude: true,
      longitude: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Transform the data to match the Location type
  const locations: Location[] =
    data?.map((item) => {
      if (
        item.userIdz === null ||
        item.latitude === null ||
        item.longitude === null
      ) {
        // Skip invalid locations
        return null;
      }

      return {
        __typename: item.__typename || "Location",
        id: item.id,
        userId: item.userIdz, // Ensure this is non-null
        latitude: item.latitude,
        longitude: item.longitude,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      };
    })?.filter((location) => location !== null) as Location[]; // Filter out null values

  return { locations, isLoading: fetching, error };
};

export default useLiveLocations;