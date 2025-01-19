import React from "react";
import useTrackUserLocation from "../hooks/useTrackUserLocation";

const TrackCurrentUser = ({ userId }: { userId: string }) => {
  const { error } = useTrackUserLocation(userId);

  if (error) {
    return <p>Error tracking location: {error}</p>;
  }

  return null; // No UI needed
};

export default TrackCurrentUser;