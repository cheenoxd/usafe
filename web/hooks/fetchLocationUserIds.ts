import { useFindMany } from "@gadgetinc/react";
import { api } from "../api";

const useFetchLocationUserIds = () => {
  const [{ data, fetching, error }] = useFindMany(api.location, {
    select: {
      userIdz: true, // Fetch only user IDs from the location table
    },
  });

  // Extract unique user IDs from the locations
  const userIds: number[] =
    data
      ?.map((location) => location.userIdz)
      .filter((id): id is number => id !== null) || []; // Ensure userId is not null

  return { userIds, isLoading: fetching, error };
};

export default useFetchLocationUserIds;