import React from "react";
import useFetchLocationUserIds from "../hooks/fetchLocationUserIds";

const SharedUsers = () => {
  const { userIds, isLoading, error } = useFetchLocationUserIds();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div>
      <h2>Users with Shared Locations</h2>
      <ul>
        {userIds.map((id) => (
          <li key={id}>User ID: {id}</li>
        ))}
      </ul>
    </div>
  );
};

export default SharedUsers;