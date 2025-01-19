import { ActionOptions } from "gadget-server";

export const options: ActionOptions = {
  actionType: "update",
};

export const run = async ({ params, api }: { params: { userId: string; latitude: number; longitude: number; }; api: any; }) => {
  const { userId, latitude, longitude } = params;

  // Find existing location record for the user
  const existingLocation = await api.location.findFirst({
    filter: {
      userId: { equals: userId },
    },
  });

  if (existingLocation) {
    // Update the location if it exists
    return await api.location.update(existingLocation.id, {
      latitude,
      longitude,
    });
  } else {
    // Create a new location record if it doesn't exist
    return await api.location.create({
      userId,
      latitude,
      longitude,
    });
  }
};

